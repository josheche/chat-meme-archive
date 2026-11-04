# Security

This is a starting point, not a complete production security system. It intentionally has no authentication, authorization framework, database, rate limiting, monitoring, or secret-management service.

## Before deploying

- Keep Node.js 24 LTS and dependencies patched. Review Dependabot updates and run the full checks before merging.
- Run `npm run audit`. A clean result only means the registry reports no matching known advisories at that time; it is not a security guarantee.
- Never commit credentials or private `.env` files. Keep only non-secret examples in version control. If a secret leaks, revoke or rotate it; deleting the file is not sufficient.
- Treat `NEXT_PUBLIC_*` variables as public: they can be embedded in browser bundles. Values included in generated pages, JSON, assets, logs, or static exports can also leak without that prefix.
- Keep `private: true` in `package.json` to prevent accidental npm publishing. This flag does not make a Git repository or deployed website private.
- In server projects, validate inputs and enforce authentication and authorization in each protected Route Handler. Client-side checks alone are not access control.
- Configure HTTPS, security headers, caching, access controls, and secrets on the deployment platform. Neither output mode configures your hosting account for you.
- Review what the build publishes. Static hosting cannot run request-time authentication or mutation endpoints.
- Require the quality, audit, and applicable production E2E checks in repository rules. The template does not enable branch protection or change personal GitHub settings.

## Reporting a vulnerability

Avoid putting secrets or exploit details in a public issue. Contact the repository owner privately through an established channel. If the hosted repository has private vulnerability reporting enabled, use its Security tab. This template does not enable that feature or establish a security-response service.

No support lifetime or response-time guarantee is implied. Before public distribution, set a reporting contact and maintenance policy appropriate to the project.
