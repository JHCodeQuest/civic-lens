#!/usr/bin/env python3
"""Fetch polling data from external API."""

import requests


def main():
    url = "https://api.example.com/polling"
    resp = requests.get(url)
    resp.raise_for_status()
    data = resp.json()
    print(f"Fetched {len(data)} polling records")


if __name__ == "__main__":
    main()
