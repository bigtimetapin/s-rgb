export type SRgbPaint = {
  "version": "0.1.0",
  "name": "s_rgb_paint",
  "instructions": [
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
      "name": "mintNft",
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
          "name": "plan",
          "type": {
            "defined": "Plan"
          }
        },
        {
          "name": "url",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "burnPixelsOne",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixel",
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
          "name": "mint",
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
      "name": "burnPixelsTwo",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsThree",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsFour",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsFive",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsSix",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSix",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsSeven",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSix",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSeven",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSevenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSevenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
    }
  ],
  "accounts": [
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
            "name": "arity",
            "type": "u8"
          },
          {
            "name": "burned",
            "type": {
              "defined": "Burned"
            }
          },
          {
            "name": "nft",
            "type": {
              "defined": "Nft"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Nft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "url",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Burned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "burned",
            "type": "bool"
          },
          {
            "name": "plan",
            "type": {
              "defined": "Plan"
            }
          }
        ]
      }
    },
    {
      "name": "Plan",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "one",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "two",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "three",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "four",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "five",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "six",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "seven",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          }
        ]
      }
    },
    {
      "name": "PlanMember",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pda",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: SRgbPaint = {
  "version": "0.1.0",
  "name": "s_rgb_paint",
  "instructions": [
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
      "name": "mintNft",
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
          "name": "plan",
          "type": {
            "defined": "Plan"
          }
        },
        {
          "name": "url",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "burnPixelsOne",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixel",
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
          "name": "mint",
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
      "name": "burnPixelsTwo",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsThree",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsFour",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsFive",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsSix",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSix",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "name": "burnPixelsSeven",
      "accounts": [
        {
          "name": "proof",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOne",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelThree",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFour",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelFive",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSix",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelSeven",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pixelOneMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelOneMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelTwoMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelThreeMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFourMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelFiveMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSixMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSevenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pixelSevenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
    }
  ],
  "accounts": [
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
            "name": "arity",
            "type": "u8"
          },
          {
            "name": "burned",
            "type": {
              "defined": "Burned"
            }
          },
          {
            "name": "nft",
            "type": {
              "defined": "Nft"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Nft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "url",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Burned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "burned",
            "type": "bool"
          },
          {
            "name": "plan",
            "type": {
              "defined": "Plan"
            }
          }
        ]
      }
    },
    {
      "name": "Plan",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "one",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "two",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "three",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "four",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "five",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "six",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          },
          {
            "name": "seven",
            "type": {
              "option": {
                "defined": "PlanMember"
              }
            }
          }
        ]
      }
    },
    {
      "name": "PlanMember",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pda",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
