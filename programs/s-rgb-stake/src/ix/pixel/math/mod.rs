use anchor_lang::prelude::*;
use crate::{Palette, Pixel, PixelIndex, PixelIndexLookup, PixelIndexLookupSeeds, PixelIndexSeeds};
use crate::error::CustomErrors;

pub mod separate;
pub mod add;

pub fn index(
    pixel_key: Pubkey,
    pixel_index: &mut PixelIndex,
    pixel_index_seeds: PixelIndexSeeds,
    pixel_index_lookup: &mut PixelIndexLookup,
    pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    palette: &mut Palette
) {
    match pixel_index_lookup.index {
        None => {
            let index = palette.indexer + 1;
            pixel_index.pixel = pixel_key;
            pixel_index.seeds = pixel_index_seeds;
            pixel_index_lookup.index = Some(
                index
            );
            pixel_index_lookup.seeds = pixel_index_lookup_seeds;
            palette.indexer = index;
        }
        Some(_) => {}
    }
}

fn assert_depth(left: &Pixel, right: &Pixel, dst: &Pixel) -> Result<()> {
    match left.seeds.depth.eq(&right.seeds.depth) && right.seeds.depth.eq(&dst.seeds.depth) {
        true => {
            Ok(())
        }
        _ => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}
