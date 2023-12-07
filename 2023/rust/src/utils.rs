use lazy_static;
use regex::Regex;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

pub fn get_input(path: &str) -> String {
  let path = Path::new(&path);

  let mut file = match File::open(&path) {
    Err(why) => {
      let display = path.display();
      panic!("couldn't open {}: {}", display, why)
    }
    Ok(file) => file,
  };

  let mut s = String::new();
  match file.read_to_string(&mut s) {
    Err(why) => {
      let display = path.display();
      panic!("couldn't read {}: {}", display, why)
    }
    Ok(_) => {
      return s;
    }
  }
}

lazy_static::lazy_static! {
  static ref NUMBER_REGEX: Regex = Regex::new(r"-*\d+(\.\d+)?").unwrap();
  static ref POSITIVE_NUMBER_REGEX: Regex = Regex::new(r"\d+(\.\d+)?").unwrap();
  static ref INTEGER_REGEX: Regex = Regex::new(r"-*\d+").unwrap();
}

// Struct for holding options
#[derive(Debug)]
pub struct GetNumbersOptions {
  pub negatives: bool,
  pub floats: bool,
}

// Default implementation for GetNumbersOptions
impl Default for GetNumbersOptions {
  fn default() -> Self {
    GetNumbersOptions {
      negatives: true,
      floats: true,
    }
  }
}

// Function to get numbers from a string
pub fn get_numbers(input: &str, options: GetNumbersOptions) -> Vec<f64> {
  let regex: &Regex = if options.negatives {
    if options.floats {
      &NUMBER_REGEX
    } else {
      &INTEGER_REGEX
    }
  } else if options.floats {
    &POSITIVE_NUMBER_REGEX
  } else {
    // Case where both negatives and floats are excluded
    return Vec::new();
  };

  let matches: Vec<_> = regex.find_iter(input).collect();

  matches
    .into_iter()
    .map(|m| m.as_str().parse::<f64>().unwrap())
    .collect()
}
