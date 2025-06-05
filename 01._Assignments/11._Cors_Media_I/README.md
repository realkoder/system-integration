# CORS HEADER

These following headers are related to _CORS_

```text
==============================================
# Following headers are set by browser
==============================================
Origin: https://frontend.example.com

Access-Control-Request-Method: POST

Access-Control-Request-Headers: Content-Type, Authorization

==============================================
# Following headers are configured server side
==============================================

Access-Control-Allow-Origin: https://example.com

Cross-Origin-Resource-Policy: same-origin

Access-Control-Allow-Methods: GET, POST, PUT

Access-Control-Allow-Headers: Content-Type, Authorization

Access-Control-Allow-Credentials: true

Access-Control-Max-Age: 600
```