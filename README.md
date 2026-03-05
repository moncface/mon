# mon[tab]

> Type `mon` + Tab in Chrome's address bar. Instant results. No new tabs.
>
> by [moncface](https://github.com/moncface)

## Install

1. Clone this repo
2. Open `chrome://extensions` → Enable **Developer Mode** → **Load unpacked** → select this folder

## Usage

Type `mon` in the address bar, press **Tab**, then enter a command. Press **Enter** to copy the result to clipboard.

| Command | Result |
|---|---|
| `uuid` | `550e8400-e29b-41d4-a716-...` |
| `pw` | `Xk#9mP2@vL5q!...` (16 chars) |
| `pw 32` | 32-character password |
| `sha hello` | `2cf24dba5fb0a30e...` (SHA-256) |
| `b64 hello` | `aGVsbG8=` |
| `b64d aGVsbG8=` | `hello` |
| `jwt <token>` | decoded payload (JSON) |
| `ts` | `1741000000` (unix timestamp) |
| `now` | `2026-03-04T14:30:00.000Z` |
| `upper hello world` | `HELLO WORLD` |
| `lower HELLO` | `hello` |
| `slug Hello World!` | `hello-world` |
| `camel hello-world` | `helloWorld` |
| `snake helloWorld` | `hello_world` |
| `cal 2026-03-15` | `Sunday, March 15, 2026` |
| `age 1990-05-01` | `35 years old` |
| `lorem` | Lorem ipsum sentence |
| `lorem 3` | 3 sentences |
| `wc hello world` | `2 words, 11 chars` |
| `calc 1920/1080` | `1920/1080 = 1.777777778` |
| `calc 3980*0.15` | `3980*0.15 = 597` |
| `calc 15% of 3980` | `15% of 3980 = 597` |
| `calc sqrt(144)` | `sqrt(144) = 12` |
| `calc pi*5**2` | `pi*5**2 = 78.53981634` |
| `px 24` | `1.5rem` |
| `px 1.5rem` | `24px` |
| `ascii A` | `65` |
| `ascii 65` | `'A'` |
| `http 404` | `404 Not Found` |
| `port 443` | `443 — HTTPS` |
| `mime png` | `png → image/png` |
| `chmod 755` | `rwxr-xr-x` |
| `cc JP` | `🇯🇵 Japan / JPY ¥ / +81` |
| `cc US` | `🇺🇸 United States / USD $ / +1` |
| `tel +81` | `+81 — Japan` |
| `tel 1` | `+1 — United States / Canada` |
| `zip 150-0001` | `東京都渋谷区神宮前` |
| `?` | list all commands |

## Why

Opening a new tab to generate a UUID, encode base64, or look up an HTTP status code is friction you don't need. `mon[tab]` puts the tools directly in Chrome's address bar — the one UI element already at your fingertips.

## Roadmap

70+ commands planned. See [roadmap](https://github.com/moncface/mon/issues).

Contributions welcome — each command is a single independent file in `commands/`.

## Support

If mon[tab] saves you time, you can support development here:

- [Buy Me a Coffee](https://www.buymeacoffee.com/YOUR_USERNAME)
- [PayPal](https://www.paypal.me/YOUR_USERNAME)

## License

MIT
