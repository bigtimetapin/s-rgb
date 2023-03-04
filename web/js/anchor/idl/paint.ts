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
      "name": "mintNftForPaint",
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
      "name": "burnPixelsForPaint",
      "accounts": [
        {
          "name": "proof",
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
          "name": "craftingProgram",
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
      "name": "mintNftForPaint",
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
      "name": "burnPixelsForPaint",
      "accounts": [
        {
          "name": "proof",
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
          "name": "craftingProgram",
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
    }
  ]
};
