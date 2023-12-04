use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

// #[bench]
// fn test(b: &mut test::Bencher) {
// b.iter(|| {
pub fn main() {
  // Create a path to the desired file
  let path = Path::new("../day1-trebuchet.txt");

  // Open the path in read-only mode, returns `io::Result<File>`
  let mut file = match File::open(&path) {
    Err(why) => {
      let display = path.display();
      panic!("couldn't open {}: {}", display, why)
    }
    Ok(file) => file,
  };

  // Read the file contents into a string, returns `io::Result<usize>`
  let mut s = String::new();
  match file.read_to_string(&mut s) {
    Err(why) => {
      let display = path.display();
      panic!("couldn't read {}: {}", display, why)
    }
    Ok(_) => {
      let mut sum: i32 = 0;
      for line in s.lines() {
        let mut nums: [i8; 2] = [-1, -1];
        for (i, char) in line.chars().enumerate() {
          match char.to_digit(10) {
            Some(digit) => {
              if nums[0] == -1 {
                nums[0] = digit as i8;
                nums[1] = digit as i8;
              } else {
                nums[1] = digit as i8;
              }
            }
            None => {
              let slice = &line[i..];
              let mut num: i8 = -1;
              if slice.starts_with("one") {
                num = 1;
              } else if slice.starts_with("two") {
                num = 2;
              } else if slice.starts_with("three") {
                num = 3;
              } else if slice.starts_with("four") {
                num = 4;
              } else if slice.starts_with("five") {
                num = 5;
              } else if slice.starts_with("six") {
                num = 6;
              } else if slice.starts_with("seven") {
                num = 7;
              } else if slice.starts_with("eight") {
                num = 8;
              } else if slice.starts_with("nine") {
                num = 9;
              }
              if num != -1 {
                if nums[0] == -1 {
                  nums[0] = num;
                  nums[1] = num;
                } else {
                  nums[1] = num;
                }
              }
            }
          }
        }
        sum += <i8 as Into<i32>>::into(nums[0] * 10 + nums[1]);
      }
      println!("{}", sum);
    }
  }
  // });
}
