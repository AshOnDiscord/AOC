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
