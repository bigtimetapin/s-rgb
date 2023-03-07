module Model.User.User exposing (User, decode)

import Json.Decode as Decode
import Model.Amount as Amount exposing (Amount)
import Model.Pixel as Pixel exposing (Pixel)
import Model.PublicKey exposing (PublicKey)
import Model.Wallet exposing (Wallet)
import Util.Decode as Util


type alias User =
    { wallet : Wallet
    , tvl : Amount
    , pools : Pools
    , palette : List Palette
    , nfts : List Proof
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
    { depth : Int
    , pixels : List Pixel
    }


type alias Proof =
    { nft : Nft
    , burned : Burned
    }


type alias Nft =
    { mint : PublicKey
    , url : String
    }


type alias Burned =
    { burned : Bool
    , plan : Plan
    }


type alias Plan =
    { red : Int
    , green : Int
    , blue : Int
    , yellow : Int
    , magenta : Int
    , cyan : Int
    , white : Int
    }


decode : String -> Result String User
decode string =
    Util.decode string decoder identity


decoder : Decode.Decoder User
decoder =
    Decode.map5 User
        (Decode.field "wallet" Decode.string)
        (Decode.field "tvl" Amount.decoder)
        (Decode.field "pools" poolsDecoder)
        (Decode.field "palette" <| Decode.list paletteDecoder)
        (Decode.field "nfts" <| Decode.list proofDecoder)


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


proofDecoder =
    Decode.map2 Proof
        (Decode.field "nft" nftDecoder)
        (Decode.field "burned" burnedDecoder)


nftDecoder =
    Decode.map2 Nft
        (Decode.field "mint" Decode.string)
        (Decode.field "url" Decode.string)


burnedDecoder =
    Decode.map2 Burned
        (Decode.field "burned" Decode.bool)
        (Decode.field "plan" planDecoder)


planDecoder =
    Decode.map7 Plan
        (Decode.field "red" Decode.int)
        (Decode.field "green" Decode.int)
        (Decode.field "blue" Decode.int)
        (Decode.field "yellow" Decode.int)
        (Decode.field "magenta" Decode.int)
        (Decode.field "cyan" Decode.int)
        (Decode.field "white" Decode.int)
