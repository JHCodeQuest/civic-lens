import re
import unicodedata


def slugify(name: str) -> str:
    """URL-safe slug from a display name.

    Kept in sync with slugify() in frontend/src/lib/utils.ts — the frontend
    builds static routes from the same rule, so the two must agree.
    """
    normalized = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9-]", "", normalized.lower().replace(" ", "-"))
