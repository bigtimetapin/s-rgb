export type SRgb = {
  "version": "0.1.0",
  "name": "s_rgb",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakeRed",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeGreen",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeBlue",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "harvestRed",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestGreen",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestBlue",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": {
            "defined": "PixelSeeds"
          }
        }
      ]
    },
    {
      "name": "mintPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "palette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "pixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        },
        {
          "name": "paletteSeeds",
          "type": {
            "defined": "PaletteSeeds"
          }
        }
      ]
    },
    {
      "name": "mergePixel",
      "accounts": [
        {
          "name": "srcPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        },
        {
          "name": "dstPaletteSeeds",
          "type": {
            "defined": "PaletteSeeds"
          }
        },
        {
          "name": "amount",
          "type": "u32"
        }
      ]
    },
    {
      "name": "addPixel",
      "accounts": [
        {
          "name": "leftPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rightPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rightPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rightPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        }
      ]
    },
    {
      "name": "separatePixel",
      "accounts": [
        {
          "name": "leftPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rightPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        }
      ]
    },
    {
      "name": "initProofIndexer",
      "accounts": [
        {
          "name": "proofIndexer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "paint",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proofIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proofIndexer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greenPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bluePixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "yellowPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "magentaPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cyanPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitePixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bluePixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bluePixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "yellowPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "yellowPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "magentaPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "magentaPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cyanPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cyanPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitePixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitePixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "burned",
          "type": {
            "defined": "Burned"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "authority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wsol",
            "type": "publicKey"
          },
          {
            "name": "tvl",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proofIndexer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "indexer",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "proofIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": "publicKey"
          },
          {
            "name": "index",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "proof",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "burned",
            "type": {
              "defined": "Burned"
            }
          }
        ]
      }
    },
    {
      "name": "palette",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PaletteSeeds"
            }
          },
          {
            "name": "indexer",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "pixelIndexLookup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelIndexLookupSeeds"
            }
          },
          {
            "name": "index",
            "type": {
              "option": "u128"
            }
          }
        ]
      }
    },
    {
      "name": "pixelIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelIndexSeeds"
            }
          },
          {
            "name": "pixel",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelSeeds"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "primary",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "tvl",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Burned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "red",
            "type": "u64"
          },
          {
            "name": "green",
            "type": "u64"
          },
          {
            "name": "blue",
            "type": "u64"
          },
          {
            "name": "yellow",
            "type": "u64"
          },
          {
            "name": "magenta",
            "type": "u64"
          },
          {
            "name": "cyan",
            "type": "u64"
          },
          {
            "name": "white",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PaletteSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PixelIndexLookupSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "r",
            "type": "u32"
          },
          {
            "name": "g",
            "type": "u32"
          },
          {
            "name": "b",
            "type": "u32"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PixelIndexSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depth",
            "type": "u8"
          },
          {
            "name": "index",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "PixelSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "r",
            "type": "u32"
          },
          {
            "name": "g",
            "type": "u32"
          },
          {
            "name": "b",
            "type": "u32"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBitDepth",
      "msg": "Invalid bit depth specified."
    },
    {
      "code": 6001,
      "name": "ChannelOverflow",
      "msg": "Input value found outside channel bounds."
    },
    {
      "code": 6002,
      "name": "InsufficientPrimaryBalance",
      "msg": "Insufficient balance of primary color token."
    },
    {
      "code": 6003,
      "name": "ChannelImbalance",
      "msg": "Source and destination channel values do not match."
    },
    {
      "code": 6004,
      "name": "InsufficientPixelBalance",
      "msg": "Insufficient balance of pixel token."
    },
    {
      "code": 6005,
      "name": "InvalidAddition",
      "msg": "Destination pixel specified does not equal the addition of the source pixels."
    },
    {
      "code": 6006,
      "name": "InvalidSeparation",
      "msg": "Destination pixel specified does not equal the separation of the source pixels."
    }
  ]
};

export const IDL: SRgb = {
  "version": "0.1.0",
  "name": "s_rgb",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakeRed",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeGreen",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stakeBlue",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "harvestRed",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestGreen",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestBlue",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeTa",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": {
            "defined": "PixelSeeds"
          }
        }
      ]
    },
    {
      "name": "mintPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "palette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "red",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "green",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "blue",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "blueMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "pixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        },
        {
          "name": "paletteSeeds",
          "type": {
            "defined": "PaletteSeeds"
          }
        }
      ]
    },
    {
      "name": "mergePixel",
      "accounts": [
        {
          "name": "srcPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        },
        {
          "name": "dstPaletteSeeds",
          "type": {
            "defined": "PaletteSeeds"
          }
        },
        {
          "name": "amount",
          "type": "u32"
        }
      ]
    },
    {
      "name": "addPixel",
      "accounts": [
        {
          "name": "leftPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rightPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rightPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rightPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        }
      ]
    },
    {
      "name": "separatePixel",
      "accounts": [
        {
          "name": "leftPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rightPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dstPixelIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelIndexLookup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPalette",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "leftPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dstPixelIndexSeeds",
          "type": {
            "defined": "PixelIndexSeeds"
          }
        },
        {
          "name": "dstPixelIndexLookupSeeds",
          "type": {
            "defined": "PixelIndexLookupSeeds"
          }
        }
      ]
    },
    {
      "name": "initProofIndexer",
      "accounts": [
        {
          "name": "proofIndexer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "paint",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proofIndex",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proofIndexer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greenPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bluePixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "yellowPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "magentaPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cyanPixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitePixel",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "redPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "redPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greenPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bluePixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bluePixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "yellowPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "yellowPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "magentaPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "magentaPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cyanPixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cyanPixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitePixelMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitePixelMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "burned",
          "type": {
            "defined": "Burned"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "authority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wsol",
            "type": "publicKey"
          },
          {
            "name": "tvl",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proofIndexer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "indexer",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "proofIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": "publicKey"
          },
          {
            "name": "index",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "proof",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "burned",
            "type": {
              "defined": "Burned"
            }
          }
        ]
      }
    },
    {
      "name": "palette",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PaletteSeeds"
            }
          },
          {
            "name": "indexer",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "pixelIndexLookup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelIndexLookupSeeds"
            }
          },
          {
            "name": "index",
            "type": {
              "option": "u128"
            }
          }
        ]
      }
    },
    {
      "name": "pixelIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelIndexSeeds"
            }
          },
          {
            "name": "pixel",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seeds",
            "type": {
              "defined": "PixelSeeds"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "primary",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "tvl",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Burned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "red",
            "type": "u64"
          },
          {
            "name": "green",
            "type": "u64"
          },
          {
            "name": "blue",
            "type": "u64"
          },
          {
            "name": "yellow",
            "type": "u64"
          },
          {
            "name": "magenta",
            "type": "u64"
          },
          {
            "name": "cyan",
            "type": "u64"
          },
          {
            "name": "white",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PaletteSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PixelIndexLookupSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "r",
            "type": "u32"
          },
          {
            "name": "g",
            "type": "u32"
          },
          {
            "name": "b",
            "type": "u32"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PixelIndexSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depth",
            "type": "u8"
          },
          {
            "name": "index",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "PixelSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "r",
            "type": "u32"
          },
          {
            "name": "g",
            "type": "u32"
          },
          {
            "name": "b",
            "type": "u32"
          },
          {
            "name": "depth",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidBitDepth",
      "msg": "Invalid bit depth specified."
    },
    {
      "code": 6001,
      "name": "ChannelOverflow",
      "msg": "Input value found outside channel bounds."
    },
    {
      "code": 6002,
      "name": "InsufficientPrimaryBalance",
      "msg": "Insufficient balance of primary color token."
    },
    {
      "code": 6003,
      "name": "ChannelImbalance",
      "msg": "Source and destination channel values do not match."
    },
    {
      "code": 6004,
      "name": "InsufficientPixelBalance",
      "msg": "Insufficient balance of pixel token."
    },
    {
      "code": 6005,
      "name": "InvalidAddition",
      "msg": "Destination pixel specified does not equal the addition of the source pixels."
    },
    {
      "code": 6006,
      "name": "InvalidSeparation",
      "msg": "Destination pixel specified does not equal the separation of the source pixels."
    }
  ]
};
