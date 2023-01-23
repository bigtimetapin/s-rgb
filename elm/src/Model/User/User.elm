module Model.User.User exposing (User, decode)

import Json.Decode as Decode
import Model.Amount as Amount exposing (Amount)
import Model.Wallet exposing (Wallet)
import Util.Decode as Util


type alias User =
    { wallet : Wallet
    , tvl : Amount
    , pools : Pools
    }


type alias Pools =
    { red : Pool
    , green : Pool
    , blue : Pool
    }


type alias Pool =
    { tvl : Amount
    , staked : Amount
    , balance : Amount
    }


decode : String -> Result String User
decode string =
    Util.decode string decoder identity


decoder : Decode.Decoder User
decoder =
    Decode.map3 User
        (Decode.field "wallet" Decode.string)
        (Decode.field "tvl" Amount.decoder)
        (Decode.field "pools" poolsDecoder)


poolsDecoder : Decode.Decoder Pools
poolsDecoder =
    Decode.map3 Pools
        (Decode.field "red" poolDecoder)
        (Decode.field "green" poolDecoder)
        (Decode.field "blue" poolDecoder)


poolDecoder : Decode.Decoder Pool
poolDecoder =
    Decode.map3 Pool
        (Decode.field "tvl" Amount.decoder)
        (Decode.field "staked" Amount.decoder)
        (Decode.field "balance" Amount.decoder)
