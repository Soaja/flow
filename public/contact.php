<?php
// flow-config.php (outside DOCUMENT_ROOT) must define RESEND_API_KEY and CONTACT_TO_EMAIL constants.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function reply($status, $body) {
    http_response_code($status);
    echo json_encode($body);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}
$body = json_decode(file_get_contents('php://input'));
if (json_last_error() !== JSON_ERROR_NONE || !is_object($body)) {
    reply(400, ['ok' => false, 'error' => 'Invalid JSON body.']);
}
if (property_exists($body, 'company') && $body->company !== '') reply(200, ['ok' => true]);
$fields = [];
foreach (['name' => 100, 'email' => 200, 'phone' => 50, 'inquiryType' => 100, 'message' => 5000] as $field => $limit) {
    $value = property_exists($body, $field) ? $body->$field : '';
    if (!is_string($value) || preg_match_all('/./us', $value) > $limit) {
        reply(400, ['ok' => false, 'error' => "Invalid $field (maximum $limit characters)."]);
    }
    $fields[$field] = preg_replace('/^[\s\x{FEFF}]+|[\s\x{FEFF}]+$/u', '', $value);
}
if ($fields['name'] === '' || $fields['message'] === '') reply(400, ['ok' => false, 'error' => 'Name and message are required.']);
if (!preg_match('/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/uD', $fields['email'])) reply(400, ['ok' => false, 'error' => 'Enter a valid email address.']);
if (preg_match('/[\r\n]/', $fields['name'] . $fields['inquiryType'])) reply(400, ['ok' => false, 'error' => 'Name and inquiry type must be single-line.']);
try {
    require dirname($_SERVER['DOCUMENT_ROOT']) . '/flow-config.php';
    if (!defined('RESEND_API_KEY') || !defined('CONTACT_TO_EMAIL') || !RESEND_API_KEY || !CONTACT_TO_EMAIL) throw new RuntimeException('Missing contact email configuration.');
    $rows = ['Name' => $fields['name'], 'Email' => $fields['email'], 'Phone' => $fields['phone'], 'Inquiry type' => $fields['inquiryType'], 'Message' => $fields['message']];
    $html = '<h1>New website inquiry</h1>';
    $text = [];
    foreach ($rows as $label => $value) {
        $escaped = htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $html .= '<p><strong>' . $label . '</strong><br>' . preg_replace('/\r\n|\r|\n/', '<br>', $escaped) . '</p>';
        $text[] = $label . ': ' . $value;
    }
    $payload = json_encode([
        'from' => 'FLOW Website <noreply@flowsport.co>', 'to' => CONTACT_TO_EMAIL,
        'reply_to' => $fields['email'], 'subject' => 'New inquiry: ' . $fields['inquiryType'] . ' — ' . $fields['name'],
        'html' => $html, 'text' => implode("\n\n", $text),
    ], JSON_THROW_ON_ERROR);
    $curl = curl_init('https://api.resend.com/emails');
    curl_setopt_array($curl, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $payload, CURLOPT_CONNECTTIMEOUT => 5, CURLOPT_TIMEOUT => 15]);
    $result = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    curl_close($curl);
    if ($result === false || $status < 200 || $status >= 300) throw new RuntimeException("Resend $status: $error $result");
    $receipt = json_decode($result, true);
    if (empty($receipt['id'])) throw new RuntimeException('Resend returned no email ID.');
    reply(200, ['ok' => true]);
} catch (Throwable $error) {
    error_log('Contact email failed: ' . $error->getMessage());
    reply(500, ['ok' => false, 'error' => 'Unable to send your message. Please try again later.']);
}
