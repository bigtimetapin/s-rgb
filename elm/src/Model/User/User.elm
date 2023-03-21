module Model.User.User exposing (User, decode, getPixel, getPixelBalance)

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
    { one : Maybe PlanMember
    , two : Maybe PlanMember
    , three : Maybe PlanMember
    , four : Maybe PlanMember
    , five : Maybe PlanMember
    , six : Maybe PlanMember
    , seven : Maybe PlanMember
    }


type alias PlanMember =
    { amount : Int
    , pda : PublicKey
    }


getPixelBalance : User -> (Palette -> Maybe Pixel) -> Int
getPixelBalance user f =
    let
        depthOne =
            List.filter
                (\p -> p.depth == 1)
                user.palette
    in
    case depthOne of
        head :: [] ->
            case f head of
                Just pixel ->
                    pixel.balance

                _ ->
                    0

        _ ->
            0


getPixel : Pixel.Seeds -> Palette -> Maybe Pixel
getPixel seeds palette =
    let
        filter =
            List.filter
                (\pixel ->
                    (pixel.seeds.r == seeds.r)
                        && (pixel.seeds.g == seeds.g)
                        && (pixel.seeds.b == seeds.b)
                        && (pixel.seeds.depth == seeds.depth)
                )
                palette.pixels
    in
    case filter of
        head :: [] ->
            Just head

        _ ->
            Nothing


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
        (Decode.maybe (Decode.field "one" planMemberDecoer))
        (Decode.maybe (Decode.field "two" planMemberDecoer))
        (Decode.maybe (Decode.field "three" planMemberDecoer))
        (Decode.maybe (Decode.field "four" planMemberDecoer))
        (Decode.maybe (Decode.field "five" planMemberDecoer))
        (Decode.maybe (Decode.field "six" planMemberDecoer))
        (Decode.maybe (Decode.field "seven" planMemberDecoer))


planMemberDecoer =
    Decode.map2 PlanMember
        (Decode.field "amount" Decode.int)
        (Decode.field "pda" Decode.string)
