use crate::utils;

pub fn p1() {
  let input: String = utils::get_input("../day2-mini.txt");

  println!("{}", input);

  let results = utils::get_numbers("7pqr3.14sty-9x", utils::GetNumbersOptions::default());

  println!("{:?}", results);

  // let mut numbers: Vec<i32> = Vec::new();
}
