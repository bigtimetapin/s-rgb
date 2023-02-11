pub mod authority;
pub mod primary;
pub mod stake;
pub mod pixel;

pub trait HasThreeSeeds {
    fn seed1(&self) -> String;
    fn seed2(&self) -> String;
    fn seed3(&self) -> String;
}

pub trait HasFourSeeds {
    fn seed1(&self) -> String;
    fn seed2(&self) -> String;
    fn seed3(&self) -> String;
    fn seed4(&self) -> String;
}

pub trait HasFiveSeeds {
    fn seed1(&self) -> String;
    fn seed2(&self) -> String;
    fn seed3(&self) -> String;
    fn seed4(&self) -> String;
    fn seed5(&self) -> String;
}
