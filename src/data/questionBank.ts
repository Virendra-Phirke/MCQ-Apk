import { Question } from '../contexts/QuizContext';

export const questionBank: Question[] = [
  // Python Questions
  {
    id: 'py_001',
    language: 'Python',
    difficulty: 'beginner',
    category: 'Data Types',
    question: 'What will be the output of the following Python code?',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'Lists are mutable objects in Python. When y = x, both variables point to the same list object. Modifying y also modifies x.',
    points: 4,
  },
  {
    id: 'py_002',
    language: 'Python',
    difficulty: 'beginner',
    category: 'Control Flow',
    question: 'What is the output of this code?',
    code: `for i in range(3):
    if i == 1:
        continue
    print(i)`,
    options: ['0\n1\n2', '0\n2', '1\n2', '0\n1'],
    correctAnswer: 1,
    explanation: 'The continue statement skips the rest of the loop iteration when i equals 1, so only 0 and 2 are printed.',
    points: 4,
  },
  {
    id: 'py_003',
    language: 'Python',
    difficulty: 'intermediate',
    category: 'Functions',
    question: 'What will this function return?',
    code: `def mystery(lst):
    return [x * 2 for x in lst if x % 2 == 0]

result = mystery([1, 2, 3, 4, 5, 6])`,
    options: ['[2, 4, 6]', '[4, 8, 12]', '[1, 3, 5]', '[2, 6, 10]'],
    correctAnswer: 1,
    explanation: 'The list comprehension filters even numbers (2, 4, 6) and multiplies each by 2, resulting in [4, 8, 12].',
    points: 6,
  },
  {
    id: 'py_004',
    language: 'Python',
    difficulty: 'intermediate',
    category: 'Object-Oriented Programming',
    question: 'What is the output of this code?',
    code: `class Parent:
    def __init__(self):
        self.value = "parent"
    
    def show(self):
        return self.value

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.value = "child"

obj = Child()
print(obj.show())`,
    options: ['parent', 'child', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'The Child class calls super().__init__() which sets value to "parent", but then immediately overwrites it with "child".',
    points: 6,
  },
  {
    id: 'py_005',
    language: 'Python',
    difficulty: 'advanced',
    category: 'Decorators',
    question: 'What does this decorator do?',
    code: `def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}")
    return "Done"

result = greet("Alice")`,
    options: ['Prints "Hello, Alice" once', 'Prints "Hello, Alice" three times', 'Returns "Done" three times', 'Causes an error'],
    correctAnswer: 1,
    explanation: 'The decorator repeats the function call 3 times. Each call prints "Hello, Alice", so it prints three times and returns "Done".',
    points: 8,
  },

  // JavaScript Questions
  {
    id: 'js_001',
    language: 'JavaScript',
    difficulty: 'beginner',
    category: 'Variables',
    question: 'What will be logged to the console?',
    code: `var x = 1;
var x = 2;
console.log(x);`,
    options: ['1', '2', 'undefined', 'Error'],
    correctAnswer: 1,
    explanation: 'With var, variables can be redeclared. The second declaration overwrites the first, so x becomes 2.',
    points: 4,
  },
  {
    id: 'js_002',
    language: 'JavaScript',
    difficulty: 'beginner',
    category: 'Functions',
    question: 'What is the output?',
    code: `function test() {
    return
    {
        value: 42
    };
}
console.log(test());`,
    options: ['{value: 42}', 'undefined', '42', 'Error'],
    correctAnswer: 1,
    explanation: 'Due to Automatic Semicolon Insertion (ASI), JavaScript adds a semicolon after return, making it return undefined.',
    points: 4,
  },
  {
    id: 'js_003',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'Closures',
    question: 'What will this code output?',
    code: `function outer() {
    let count = 0;
    return function inner() {
        count++;
        return count;
    };
}

const counter = outer();
console.log(counter());
console.log(counter());`,
    options: ['1\n1', '1\n2', '0\n1', 'undefined\nundefined'],
    correctAnswer: 1,
    explanation: 'The inner function forms a closure over the count variable, maintaining its state between calls.',
    points: 6,
  },
  {
    id: 'js_004',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'Promises',
    question: 'What will be the output?',
    code: `Promise.resolve(1)
    .then(x => x + 1)
    .then(x => {
        throw new Error('Error!');
    })
    .then(x => x + 1)
    .catch(err => 'Caught')
    .then(x => console.log(x));`,
    options: ['2', '3', 'Caught', 'Error!'],
    correctAnswer: 2,
    explanation: 'The promise chain executes until the throw statement, which triggers the catch handler returning "Caught".',
    points: 6,
  },
  {
    id: 'js_005',
    language: 'JavaScript',
    difficulty: 'advanced',
    category: 'Async/Await',
    question: 'What happens when this code runs?',
    code: `async function test() {
    console.log('1');
    await Promise.resolve();
    console.log('2');
}

console.log('3');
test();
console.log('4');`,
    options: ['1\n2\n3\n4', '3\n1\n4\n2', '3\n4\n1\n2', '1\n3\n2\n4'],
    correctAnswer: 1,
    explanation: 'Synchronous code runs first (3, 1, 4), then the awaited promise resolves and continues (2).',
    points: 8,
  },

  // Java Questions
  {
    id: 'java_001',
    language: 'Java',
    difficulty: 'beginner',
    category: 'Basic Syntax',
    question: 'What will this Java code output?',
    code: `public class Test {
    public static void main(String[] args) {
        int x = 10;
        int y = x++;
        System.out.println(y);
    }
}`,
    options: ['10', '11', '9', 'Compilation error'],
    correctAnswer: 0,
    explanation: 'Post-increment (x++) returns the current value of x (10) before incrementing it.',
    points: 4,
  },
  {
    id: 'java_002',
    language: 'Java',
    difficulty: 'beginner',
    category: 'Strings',
    question: 'What is the result?',
    code: `String a = "Hello";
String b = "Hello";
String c = new String("Hello");
System.out.println(a == b);
System.out.println(a == c);`,
    options: ['true\ntrue', 'true\nfalse', 'false\ntrue', 'false\nfalse'],
    correctAnswer: 1,
    explanation: 'String literals are interned, so a == b is true. New String() creates a different object, so a == c is false.',
    points: 4,
  },
  {
    id: 'java_003',
    language: 'Java',
    difficulty: 'intermediate',
    category: 'Inheritance',
    question: 'What will be printed?',
    code: `class Parent {
    void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    void display() {
        System.out.println("Child");
    }
}

Parent obj = new Child();
obj.display();`,
    options: ['Parent', 'Child', 'Compilation error', 'Runtime error'],
    correctAnswer: 1,
    explanation: 'Method overriding: the actual object type (Child) determines which method is called at runtime.',
    points: 6,
  },
  {
    id: 'java_004',
    language: 'Java',
    difficulty: 'intermediate',
    category: 'Collections',
    question: 'What is the output?',
    code: `import java.util.*;

List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.remove(1);
System.out.println(list);`,
    options: ['[A, C]', '[A, B]', '[B, C]', '[A, B, C]'],
    correctAnswer: 0,
    explanation: 'remove(1) removes the element at index 1 ("B"), leaving "A" and "C".',
    points: 6,
  },
  {
    id: 'java_005',
    language: 'Java',
    difficulty: 'advanced',
    category: 'Generics',
    question: 'Which statement is correct about this generic method?',
    code: `public static <T extends Comparable<T>> T findMax(T[] array) {
    T max = array[0];
    for (T element : array) {
        if (element.compareTo(max) > 0) {
            max = element;
        }
    }
    return max;
}`,
    options: ['T must implement Comparable', 'T can be any type', 'Method only works with numbers', 'Compilation error'],
    correctAnswer: 0,
    explanation: 'The bounded type parameter <T extends Comparable<T>> ensures T implements Comparable interface.',
    points: 8,
  },

  // C++ Questions
  {
    id: 'cpp_001',
    language: 'C++',
    difficulty: 'beginner',
    category: 'Pointers',
    question: 'What will this C++ code output?',
    code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x;
    cout << *ptr << endl;
    return 0;
}`,
    options: ['10', 'Address of x', '0', 'Compilation error'],
    correctAnswer: 0,
    explanation: '*ptr dereferences the pointer, giving us the value stored at the address ptr points to, which is 10.',
    points: 4,
  },
  {
    id: 'cpp_002',
    language: 'C++',
    difficulty: 'beginner',
    category: 'Arrays',
    question: 'What is the output?',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    cout << arr[0] + arr[4] << endl;
    return 0;
}`,
    options: ['5', '6', '9', '1'],
    correctAnswer: 1,
    explanation: 'arr[0] is 1 and arr[4] is 5, so 1 + 5 = 6.',
    points: 4,
  },
  {
    id: 'cpp_003',
    language: 'C++',
    difficulty: 'intermediate',
    category: 'Classes',
    question: 'What will be printed?',
    code: `#include <iostream>
using namespace std;

class Test {
    int value;
public:
    Test(int v) : value(v) {}
    void display() const {
        cout << value << endl;
    }
};

int main() {
    Test obj(42);
    obj.display();
    return 0;
}`,
    options: ['42', '0', 'Garbage value', 'Compilation error'],
    correctAnswer: 0,
    explanation: 'The constructor initializes value to 42 using the initialization list, and display() prints this value.',
    points: 6,
  },
  {
    id: 'cpp_004',
    language: 'C++',
    difficulty: 'intermediate',
    category: 'Memory Management',
    question: 'What is the issue with this code?',
    code: `#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(10);
    cout << *ptr << endl;
    // Missing something here
    return 0;
}`,
    options: ['No issue', 'Memory leak', 'Null pointer access', 'Stack overflow'],
    correctAnswer: 1,
    explanation: 'The code allocates memory with new but never calls delete, causing a memory leak.',
    points: 6,
  },
  {
    id: 'cpp_005',
    language: 'C++',
    difficulty: 'advanced',
    category: 'Templates',
    question: 'What does this template function do?',
    code: `template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maximum(5, 3) << endl;
    cout << maximum(2.5, 7.1) << endl;
    return 0;
}`,
    options: ['Always returns first parameter', 'Returns larger of two values', 'Compilation error', 'Returns sum'],
    correctAnswer: 1,
    explanation: 'The template function compares two values of the same type and returns the larger one using the ternary operator.',
    points: 8,
  },

  // Additional questions for other languages...
  {
    id: 'cs_001',
    language: 'C#',
    difficulty: 'beginner',
    category: 'Basic Syntax',
    question: 'What will this C# code output?',
    code: `using System;

class Program {
    static void Main() {
        int x = 5;
        int y = ++x;
        Console.WriteLine(y);
    }
}`,
    options: ['5', '6', '4', 'Compilation error'],
    correctAnswer: 1,
    explanation: 'Pre-increment (++x) increments x first, then returns the new value (6).',
    points: 4,
  },
  {
    id: 'go_001',
    language: 'Go',
    difficulty: 'beginner',
    category: 'Variables',
    question: 'What will this Go code output?',
    code: `package main

import "fmt"

func main() {
    var x int
    fmt.Println(x)
}`,
    options: ['0', 'null', 'undefined', 'Compilation error'],
    correctAnswer: 0,
    explanation: 'In Go, uninitialized int variables have a zero value of 0.',
    points: 4,
  },
  {
    id: 'ruby_001',
    language: 'Ruby',
    difficulty: 'beginner',
    category: 'Arrays',
    question: 'What will this Ruby code output?',
    code: `arr = [1, 2, 3, 4, 5]
puts arr[2]`,
    options: ['2', '3', '4', 'nil'],
    correctAnswer: 1,
    explanation: 'Ruby arrays are zero-indexed, so arr[2] returns the third element, which is 3.',
    points: 4,
  },
  {
    id: 'php_001',
    language: 'PHP',
    difficulty: 'beginner',
    category: 'Variables',
    question: 'What will this PHP code output?',
    code: `<?php
$x = "5";
$y = 3;
echo $x + $y;
?>`,
    options: ['53', '8', '5', 'Error'],
    correctAnswer: 1,
    explanation: 'PHP automatically converts the string "5" to integer 5 when performing arithmetic, resulting in 5 + 3 = 8.',
    points: 4,
  },
  {
    id: 'swift_001',
    language: 'Swift',
    difficulty: 'beginner',
    category: 'Optionals',
    question: 'What will this Swift code output?',
    code: `var name: String? = "Swift"
if let unwrapped = name {
    print(unwrapped)
} else {
    print("No name")
}`,
    options: ['Swift', 'No name', 'Optional("Swift")', 'nil'],
    correctAnswer: 0,
    explanation: 'Optional binding with if let successfully unwraps the optional string and prints "Swift".',
    points: 4,
  },
];