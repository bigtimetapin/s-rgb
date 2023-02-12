module Model.Pixel exposing (Pixel, Seeds, decoder, encode)

import Json.Decode as Decode
import Json.Encode as Encode
import Model.PublicKey exposing (PublicKey)


type alias Pixel =
    { mint : PublicKey
    , seeds : Seeds
    , balance : Int
    }


type alias Seeds =
    { r : Int
    , g : Int
    , b : Int
    , depth : Int
    }


decoder : Decode.Decoder Pixel
decoder =
    Decode.map3 Pixel
        (Decode.field "mint" Decode.string)
        (Decode.field "seeds" seedsDecoder)
        (Decode.field "balance" Decode.int)


seedsDecoder : Decode.Decoder Seeds
seedsDecoder =
    Decode.map4 Seeds
        (Decode.field "r" Decode.int)
        (Decode.field "g" Decode.int)
        (Decode.field "b" Decode.int)
        (Decode.field "depth" Decode.int)


encode : Seeds -> String
encode seeds =
    Encode.encode 0 <|
        encoder seeds


encoder : Seeds -> Encode.Value
encoder seeds =
    Encode.object
        [ ( "r", Encode.int seeds.r )
        , ( "g", Encode.int seeds.g )
        , ( "b", Encode.int seeds.b )
        , ( "depth", Encode.int seeds.depth )
        ]
