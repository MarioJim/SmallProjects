use std::io;
use std::cmp::Ordering;
use std::iter::Iterator;
use rand::Rng;

fn read_trimmed_line() -> String {
    let mut line = String::new();
    io::stdin().read_line(&mut line)
        .expect("Failed to read line");
    line.trim().to_string()
}

fn read_first_char() -> Option<char> {
    read_trimmed_line().chars().next()
}

fn random_guess() {
    println!("===== RANDOM GUESS =====");
    let mut order:[u8; 100] = [0; 100];
    for i in 1..100 {
        order[i] = i as u8;
    }
    for i in (1..99).rev() {
        let rand_num = rand::thread_rng().gen_range(0, &i);
        order.swap(i, rand_num);
    }
    for i in 1..100 {
        println!("Is your number {}? [y/N]", order[i]);
        let guess = match read_first_char() {
            Some(ch) => ch,
            None => continue,
        };
        if guess == 'y' || guess == 'Y' {
            println!("Yay!");
            break;
        }
    }
}

fn linear_search_guess() {
    println!("===== LINEAR SEARCH GUESS =====");
    for i in 1..100 {
        println!("Is your number {}? [y/N]", &i);
        let guess = match read_first_char() {
            Some(ch) => ch,
            None => continue,
        };
        if guess == 'y' || guess == 'Y' {
            println!("Yay!");
            break;
        }
    }
}

fn binary_search_guess() {
    println!("===== BINARY SEARCH GUESS =====");
    let mut low = 1;
    let mut high = 100;
    let mut mid;
    loop {
        mid = (low + high) / 2;
        println!("Is your number less (l), equal (e) or greater (g) than {}?", &mid);
        let answer = match read_first_char() {
            Some(ch) => ch,
            None => continue,
        };
        match answer {
            'l' => high = mid,
            'e' => {
                println!("Yay!");
                break;
            }
            'g' => low = mid,
            _ => continue,
        }
    }
}

fn person_guess() {
    println!("It's your time to guess!");
    let secret_number:u64 = rand::thread_rng().gen_range(1, 101);
    loop {
        println!("Please input your guess.");
        let mut guess = read_trimmed_line();
        let guess: u64 = match guess.parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        println!("You guessed: {}", &guess);
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            },
            Ordering::Greater => println!("Too big!"),
        }
    }
}

fn main() {
    random_guess();
    linear_search_guess();
    binary_search_guess();
    person_guess();
}
