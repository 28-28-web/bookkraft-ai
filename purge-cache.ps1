$zoneId  = "09bcc69e6eb1a653cfcfa37d44aca096"
$token   = "PASTE_TOKEN_HERE"

$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type"  = "application/json"
}

$body = '{"purge_everything":true}'

$response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/purge_cache" -Method POST -Headers $headers -Body $body

$response | ConvertTo-Json
