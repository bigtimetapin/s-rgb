module Model.User.User exposing (User, decode)

import Json.Decode as Decode
import Model.Amount as Amount exposing (Amount)
import Model.Pixel as Pixel exposing (Pixel)
import Model.Wallet exposing (Wallet)
import Util.Decode as Util


type alias User =
    { wallet : Wallet
    , tvl : Amount
    , pools : Pools
    , palette: List Palette
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

type alias Palette =
    { depth: Int
    , pixels: List Pixel
    }


decode : String -> Result String User
decode string =
    Util.decode string decoder identity


decoder : Decode.Decoder User
decoder =
    Decode.map4 User
        (Decode.field "wallet" Decode.string)
        (Decode.field "tvl" Amount.decoder)
        (Decode.field "pools" poolsDecoder)
        (Decode.field "palette" <| Decode.list paletteDecoder)


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

paletteDecoder : Decode.Decoder Palette
paletteDecoder =
    Decode.map2 Palette
        (Decode.field "depth" Decode.int)
        (Decode.field "pixels" <| Decode.list Pixel.decoder)
