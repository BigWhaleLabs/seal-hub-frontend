# SealHub frontend code

## Local launch

1. Install dependencies with `yarn`
2. Download essential ZK files with `yarn download-zk-files`
3. Run the server with `yarn start`

## Environment variables

| Name                                  | Description                                                    |
| ------------------------------------- | -------------------------------------------------------------- |
| `VITE_ENCRYPT_KEY`                    | Secret key to encrypt local storage (defaults to `SECRET_KEY`) |
| `VITE_SEAL_HUB_CONTRACT`              | Sealhub contract address (defaults to @bwl/constants)          |
| `VITE_SEAL_HUB_PROVER_ADDRESS`        | Address of the centralized prover (defaults to @bwl/constants) |
| `VITE_GSN_PAYMASTER_CONTRACT_ADDRESS` | GSN Paymaster contract address (defaults to @bwl/constants)    |
| `VITE_GSN_SC_RELAY`                   | Relay URL (defaults to @bwl/constants)                         |
| `VITE_ETH_RPC`                        | ETH RPC URL (defaults to @bwl/constants)                       |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
