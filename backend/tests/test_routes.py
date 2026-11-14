from fastapi.routing import APIRoute

from app.main import create_app

_API_PREFIX = "/api/"


def test_all_routes_use_api_prefix() -> None:
    """Caddy proxies only /api/* to the backend. A route outside it is unreachable in prod."""
    app = create_app()

    # APIRoute skips FastAPI's own /docs and /openapi.json routes.
    outside = [
        route.path
        for route in app.routes
        if isinstance(route, APIRoute) and not route.path.startswith(_API_PREFIX)
    ]

    assert outside == []
