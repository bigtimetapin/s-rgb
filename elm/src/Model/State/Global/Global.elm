module Model.State.Global.Global exposing (Global(..), default)

import Model.User.User exposing (User)


type Global
    = NoWalletYet
    | WalletMissing -- no browser extension found
    | HasUser User


default : Global
default =
    NoWalletYet
