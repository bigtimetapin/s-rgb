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
          "name": "stakeAta",
          "isMut": true,
          "isSigner": false
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
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ata",
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
          }
        ]
      }
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
          "name": "stakeAta",
          "isMut": true,
          "isSigner": false
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
          "name": "redMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ata",
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
          }
        ]
      }
    }
  ]
};
