# SealHub frontend code

## Local launch

1. Install dependencies with `yarn`
2. Download essential ZKP files with `yarn get-zkp`
3. Run the server with `yarn start`

## Environment variables

| Name                                  | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| `VITE_ALCHEMY_API_KEY`                | Alchemy Api key                                             |
| `VITE_SEAL_HUB`                       | Sealhub contract address                                    |
| `VITE_GSN_PAYMASTER_CONTRACT_ADDRESS` | GSN Paymaster contract address (defaults to @bwl/constants) |
| `VITE_GSN_SC_RELAY`                   | Relay URL (defaults to @bwl/constants)                      |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
- `yarn get-zkp` — will run `.sh` script that downloads ZKP files into `public/zkp`
