pub mod craft;

pub trait HasThreeSeeds {
    fn seed1(&self) -> Vec<u8>;
    fn seed2(&self) -> Vec<u8>;
    fn seed3(&self) -> Vec<u8>;
}

pub trait HasFourSeeds {
    fn seed1(&self) -> Vec<u8>;
    fn seed2(&self) -> Vec<u8>;
    fn seed3(&self) -> Vec<u8>;
    fn seed4(&self) -> Vec<u8>;
}

pub trait HasFiveSeeds {
    fn seed1(&self) -> Vec<u8>;
    fn seed2(&self) -> Vec<u8>;
    fn seed3(&self) -> Vec<u8>;
    fn seed4(&self) -> Vec<u8>;
    fn seed5(&self) -> Vec<u8>;
}

pub trait HasSixSeeds {
    fn seed1(&self) -> Vec<u8>;
    fn seed2(&self) -> Vec<u8>;
    fn seed3(&self) -> Vec<u8>;
    fn seed4(&self) -> Vec<u8>;
    fn seed5(&self) -> Vec<u8>;
    fn seed6(&self) -> Vec<u8>;
}
