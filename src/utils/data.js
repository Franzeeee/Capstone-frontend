const lessons = [
    {
        title: "Variables",
        content: `
            \`\`\`Para
            In Python, variables are used to store information to be referenced and manipulated within a program. They serve as symbolic names (or identifiers) for values. Variables provide a way to label data with a descriptive name, making your code more readable and logical.
            \`\`\`End
    
            \`\`\`Bold
            Key Characteristics of Python Variables:
            \`\`\`End
    
            \`\`\`Sub-topic
            Dynamic Typing
            \`\`\`End
    
            \`\`\`Para
            Python is a dynamically typed language. This means you don’t have to declare the type of a variable when you create one. The type is inferred from the value you assign to it.
            A variable's type can change at runtime, depending on the value assigned to it.
            \`\`\`End
    
            \`\`\`Code
            x = 5         # x is an integer
            x = "Hello"   # Now, x is a string
            \`\`\`End
    
            \`\`\`Para
            In the above code, x starts as an integer (5), but when reassigned "Hello", it becomes a string. The type of x changes dynamically without any explicit type declaration.
            \`\`\`End
    
            \`\`\`Sub-topic
            Case Sensitivity
            \`\`\`End
    
            \`\`\`Para
            Python variable names are case-sensitive, meaning Variable and variable are treated as two distinct variables.
            \`\`\`End
    
            \`\`\`Code
            variable = 10
            Variable = 20
    
            print(variable)  # Output: 10
            print(Variable)  # Output: 20
            \`\`\`End
    
            \`\`\`Para
            Here, variable and Variable are different identifiers, even though they have the same letters, due to case sensitivity.
            \`\`\`End
    
            \`\`\`Sub-topic
            Naming Conventions for Python Variables
            \`\`\`End
    
            \`\`\`Para
            Python has specific rules and recommendations for naming variables.
            \`\`\`End
    
            \`\`\`ListTitle
            Rules for Valid Variable Names:
            \`\`\`List
            ● Variable names can contain letters (A-Z, a-z), digits (0-9), and underscores (_).
            ● Must start with a letter or an underscore.
            ● Variable names cannot start with a digit.
            Cannot use reserved keywords (e.g., if, else, while, for, etc.).
            \`\`\`End
    
            \`\`\`Sub-topic
            Example of Valid and Invalid Names:
            \`\`\`End
    
            \`\`\`Code
            valid_name = "This is valid"
            _valid_name2 = "This is also valid"
            Invalid-Name = "This is invalid"  # Hyphen is not allowed
            1variable = "This is invalid"  # Cannot start with a number
            \`\`\`End
    
            \`\`\`Sub-topic
            Recommended Naming Conventions
            \`\`\`End
    
            \`\`\`Para
            Use descriptive names that make the purpose of the variable clear.
            \`\`\`End
    
            \`\`\`ListTitle
            Follow PEP8 guidelines for naming:
            \`\`\`List
            ● Use lowercase letters with words separated by underscores (snake_case), especially for general-purpose variables.
            ● For constants, use uppercase letters separated by underscores (e.g., MAX_LENGTH).
            \`\`\`End
    
            \`\`\`Sub-topic
            Memory Management in Python
            \`\`\`End
    
            \`\`\`Para
            Python handles memory management automatically through two mechanisms.
            \`\`\`End
    
            \`\`\`Sub-topic
            Reference Counting
            \`\`\`End
    
            \`\`\`Para
            Each object in Python maintains a reference count, i.e., the number of variables referencing it. When this count drops to zero (no references to the object), the object is removed from memory.
            \`\`\`End
    
            \`\`\`Code
            a = [1, 2, 3]   # List object referenced by 'a'
            b = a           # 'b' is another reference to the same object
            del a           # 'a' is deleted, but 'b' still references the object
            \`\`\`End
    
            \`\`\`Sub-topic
            Garbage Collection
            \`\`\`End
    
            \`\`\`Para
            Python has a garbage collector that looks for circular references and clears objects that are no longer accessible, thus freeing memory automatically.
            \`\`\`End
    
            \`\`\`Sub-topic
            Assigning Values to Variables:
            \`\`\`End
    
            \`\`\`Para
            You assign a value to a variable using the assignment operator (=).
            \`\`\`End
    
            \`\`\`Code
            a = 5
            b = 3.14
            message = "Hello, World!"
            \`\`\`End
    
            \`\`\`Para
            Here, a is assigned the value 5 (an integer), b is assigned 3.14 (a float), and message is assigned "Hello, World!" (a string).
            \`\`\`End
    
            \`\`\`Sub-topic
            Multiple Assignment
            \`\`\`End
    
            \`\`\`Para
            You can assign multiple values to multiple variables in a single line.
            \`\`\`End
    
            \`\`\`Code
            a, b, c = 1, 2.5, "Python"
            \`\`\`End
    
            \`\`\`Para
            In this example, a gets the value 1 (integer), b gets 2.5 (float), and c gets "Python" (string).
            \`\`\`End
    
            \`\`\`Sub-topic
            Swapping Variables
            \`\`\`End
    
            \`\`\`Para
            Python allows easy swapping of variables without needing a temporary variable, thanks to tuple unpacking.
            \`\`\`End
    
            \`\`\`Code
            x = 10
            y = 20
    
            # Swap the values of x and y
            x, y = y, x
    
            print(x)  # Output: 20
            print(y)  # Output: 10
            \`\`\`End
    
            \`\`\`Sub-topic
            Reassigning Variables
            \`\`\`End
    
            \`\`\`Para
            Variables in Python can be reassigned at any time, and the new value will overwrite the old one. The type of the variable can also change with reassignment.
            \`\`\`End
    
            \`\`\`Code
            x = 10      # x is an integer
            x = "Hello" # x is now a string
    
            print(x)  # Output: Hello
            \`\`\`End
    
            \`\`\`Para
            In this example, x is first an integer, but then it is reassigned as a string. Python allows this flexibility due to its dynamic typing nature.
            \`\`\`End
    
            \`\`\`ListTitle
            Key Points from the Example:
            \`\`\`List
            ● Assignment and Reassignment:
            Variables x, y, and message are assigned initial values, and later x is reassigned a new value ("Hello").
            ● Mathematical Operations:
            Variables a and b are used in a calculation (a + b), and the result is stored in the variable sum_result.
            ● Printing Variables:
            The print() function is used to display the current value of the variables at each step.
            \`\`\`End
        `
    },
    {
        "title": "Operators",
        "content": `
            \`\`\`Para
            Operators are special symbols or keywords in Python that perform operations on variables and values. Python supports a variety of operators, which are categorized based on the type of operations they perform. These include arithmetic, comparison, logical, bitwise, assignment, and more.
            \`\`\`End
    
            \`\`\`Sub-topic
            Categories of Python Operators
            \`\`\`End
    
            \`\`\`Sub-topic
            Arithmetic Operators
            \`\`\`End
    
            \`\`\`Para
            These operators perform basic mathematical operations.
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description           | Example         |
            |------------|-----------------------|-----------------|
            | +          | Addition              | a + b           |
            | -          | Subtraction           | a - b           |
            | *          | Multiplication        | a * b           |
            | /          | Division              | a / b           |
            | %          | Modulus               | a % b           |
            | **         | Exponentiation        | a ** b          |
            | //         | Floor Division        | a // b          |
            \`\`\`End
    
            \`\`\`Sub-topic
            Comparison (Relational) Operators
            \`\`\`End
    
            \`\`\`Para
            These operators compare two values and return a Boolean result (True or False).
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description               | Example       |
            |------------|---------------------------|---------------|
            | ==         | Equal to                  | a == b        |
            | !=         | Not equal to              | a != b        |
            | >          | Greater than              | a > b         |
            | <          | Less than                 | a < b         |
            | >=         | Greater than or equal to  | a >= b        |
            | <=         | Less than or equal to     | a <= b        |
            \`\`\`End
    
            \`\`\`Sub-topic
            Logical Operators
            \`\`\`End
    
            \`\`\`Para
            Logical operators are used to combine conditional statements.
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description                        | Example       |
            |------------|------------------------------------|---------------|
            | and        | True if both conditions are true   | a and b       |
            | or         | True if at least one is true       | a or b        |
            | not        | Inverts the Boolean value          | not a         |
            \`\`\`End
    
            \`\`\`Sub-topic
            Assignment Operators
            \`\`\`End
    
            \`\`\`Para
            These operators assign values to variables, sometimes modifying the variable in the process.
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description                | Example             |
            |------------|----------------------------|---------------------|
            | =          | Assigns a value            | x = 5               |
            | +=         | Adds and assigns           | x += 3 (x = x + 3)  |
            | -=         | Subtracts and assigns      | x -= 3 (x = x - 3)  |
            | *=         | Multiplies and assigns     | x *= 3 (x = x * 3)  |
            | /=         | Divides and assigns        | x /= 3 (x = x / 3)  |
            | %=         | Modulus and assigns        | x %= 3 (x = x % 3)  |
            | //=        | Floor division and assigns | x //= 3 (x = x // 3)|
            | **=        | Exponent and assigns       | x **= 3 (x = x ** 3)|
            \`\`\`End
    
            \`\`\`Sub-topic
            Bitwise Operators
            \`\`\`End
    
            \`\`\`Para
            These operators work on bits and perform bit-by-bit operations.
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description              | Example   |
            |------------|--------------------------|-----------|
            | &          | AND                      | a & b     |
            | |          | OR                       | a | b     |
            | ^          | XOR                      | a ^ b     |
            | ~          | NOT (complement)         | ~a        |
            | <<         | Left shift               | a << 2    |
            | >>         | Right shift              | a >> 2    |
            \`\`\`End
    
            \`\`\`Sub-topic
            Identity Operators
            \`\`\`End
    
            \`\`\`Para
            These operators check if two objects share the same memory location.
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description                     | Example          |
            |------------|---------------------------------|------------------|
            | is         | True if the operands are identical | a is b        |
            | is not     | True if the operands are not identical | a is not b|
            \`\`\`End
    
            \`\`\`Sub-topic
            Membership Operators
            \`\`\`End
    
            \`\`\`Para
            These operators check if a value or object exists in a sequence (like a list, tuple, or string).
            \`\`\`End
    
            \`\`\`Table
            | Operator   | Description                          | Example          |
            |------------|--------------------------------------|------------------|
            | in         | True if value exists in the sequence | a in list        |
            | not in     | True if value does not exist         | a not in list    |
            \`\`\`End
    
            \`\`\`Sub-topic
            Example of Operators in Python
            \`\`\`End
    
            \`\`\`Para
            Here's an example that demonstrates various types of operators:
            \`\`\`End
    
            \`\`\`Code
            # Arithmetic operators
            a = 10
            b = 3
            print("Addition:", a + b)        # Output: 13
            print("Subtraction:", a - b)     # Output: 7
            print("Multiplication:", a * b)  # Output: 30
            print("Division:", a / b)        # Output: 3.3333
            print("Modulus:", a % b)         # Output: 1
            print("Exponentiation:", a ** b) # Output: 1000
            print("Floor Division:", a // b) # Output: 3
    
            # Comparison operators
            print("Is a equal to b?", a == b)   # Output: False
            print("Is a greater than b?", a > b) # Output: True
    
            # Logical operators
            x = True
            y = False
            print("x and y:", x and y)   # Output: False
            print("x or y:", x or y)     # Output: True
            print("not x:", not x)       # Output: False
    
            # Assignment operators
            a = 5
            a += 3  # a = a + 3
            print("a after a += 3:", a)  # Output: 8
    
            # Bitwise operators
            p = 6  # In binary: 110
            q = 3  # In binary: 011
            print("Bitwise AND:", p & q) # Output: 2 (Binary: 010)
            print("Bitwise OR:", p | q)  # Output: 7 (Binary: 111)
            \`\`\`End
    
            \`\`\`Para
            This example covers different operator categories, demonstrating arithmetic, comparison, logical, assignment, and bitwise operations. Each operator is applied to variables, and the result is printed to show the output.
            \`\`\`End
        `
    },
    {
        "title": "Comments",
        "content": `
            \`\`\`Para
            Comments in Python are used to explain code, make it more readable, or to prevent the execution of certain lines of code. They are not executed by Python, and their purpose is purely for humans reading the code. Comments are crucial when writing clean, understandable, and maintainable code.
            \`\`\`End
    
            \`\`\`ListTitle
            Python supports two types of comments
            \`\`\`List
                Single-line comments
                Multi-line comments
            \`\`\`End
    
            \`\`\`Sub-topic
            1. Single-line Comments
            \`\`\`End
    
            \`\`\`Para
            Single-line comments start with a # symbol and extend to the end of the line. They are often used for brief explanations of a specific line or block of code.
            \`\`\`End
    
            \`\`\`Code
            # This is a single-line comment
            x = 5  # You can also place a comment next to code
            \`\`\`End
    
            \`\`\`Sub-topic
            2. Multi-line Comments
            \`\`\`End
    
            \`\`\`Para
            Python does not have a specific syntax for multi-line comments like some other languages (e.g., /* ... */ in C). Instead, you can use multiple # symbols for each line or use a multi-line string (enclosed in triple quotes ''' or """). However, the latter is actually considered a string, and while it doesn't get executed, it is stored in memory if not used correctly. The more common practice is using multiple single-line comments.
            \`\`\`End
    
            \`\`\`Sub-topic
            Using multiple single-line comments
            \`\`\`End
    
            \`\`\`Code
            # This is a comment
            # that spans multiple
            # lines.
            \`\`\`End
    
            \`\`\`Sub-topic
            Using a multi-line string for commenting
            \`\`\`End
    
            \`\`\`Code
            """
            This is a multi-line string
            that can also serve as a comment.
            It is not executed by Python unless assigned to a variable.
            """
            \`\`\`End
    
            \`\`\`Para
            Why Use Comments?
            Documentation: Comments help explain the logic behind your code, making it easier for others (or even you in the future) to understand what you've done.
            Debugging: You can temporarily "comment out" sections of code that you want to disable for testing or debugging purposes.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Using Comments in Python
            \`\`\`End
    
            \`\`\`Code
            # This function adds two numbers
            def add_numbers(a, b):
                # The following line performs the addition
                return a + b
    
            # Now we call the function
            result = add_numbers(10, 5)  # Expecting 15
            print("The result is:", result)
    
            """
            The block below shows additional code
            that we are currently not using in this example.
            This can serve as a placeholder for future code.
            """
            # def subtract_numbers(a, b):
            #     return a - b
            \`\`\`End
    
            \`\`\`ListTitle
            Key Points:
            \`\`\`List
                Single-line comments are marked with #.
                Multi-line comments can be achieved using triple quotes """ or ''' or by multiple single-line comments.
                Comments don't affect the execution of the code and are useful for explaining and debugging.
            \`\`\`End
        `
    },
    {
        "title": "String Manipulation",
        "content": `
            \`\`\`Para
            In Python, strings are sequences of characters enclosed in either single quotes ('), double quotes ("), or triple quotes (''' or """). Python provides a wide range of functionalities to manipulate strings, from basic slicing to more advanced formatting and operations.
            \`\`\`End
    
            \`\`\`ListTitle
            Key Characteristics of Strings in Python:
            \`\`\`List
            Immutable: Once a string is created, it cannot be changed. You can create a new string, but you cannot modify the original string.
            Indexing: Strings are indexed, starting from 0 for the first character. You can access individual characters using square brackets.
            Slicing: You can extract parts of a string using slicing, which allows for retrieving substrings.
            Common String Manipulation Operations
            \`\`\`End
    
            \`\`\`Sub-topic
            Creating Strings
            \`\`\`End
    
            \`\`\`Code
            s1 = "Hello"  # Double quotes
            s2 = 'World'  # Single quotes
            s3 = """This is a multiline string"""  # Triple quotes for multi-line
            \`\`\`End
    
            \`\`\`Sub-topic
            Accessing Characters (Indexing)
            \`\`\`End
    
            \`\`\`Code
            word = "Python"
            print(word[0])   # Output: P
            print(word[-1])  # Output: n (negative indexing starts from the end)
            \`\`\`End
    
            \`\`\`Sub-topic
            Slicing Strings
            \`\`\`End
    
            \`\`\`Code
            text = "Hello, World"
            print(text[0:5])  # Output: Hello (slicing from index 0 to 4)
            print(text[7:])   # Output: World (from index 7 to the end)
            print(text[:5])   # Output: Hello (from start to index 4)
            print(text[::2])  # Output: Hlo ol (skipping every second character)
            \`\`\`End
    
            \`\`\`Sub-topic
            Concatenating Strings
            \`\`\`End
    
            \`\`\`Para
            Concatenation is combining two or more strings using the + operator.
            \`\`\`End
    
            \`\`\`Code
            greeting = "Hello" + " " + "World"
            print(greeting)   # Output: Hello World
            \`\`\`End
    
            \`\`\`Sub-topic
            Repeating Strings
            \`\`\`End
    
            \`\`\`Para
            You can repeat strings using the * operator.
            \`\`\`End
    
            \`\`\`Code
            repeated = "Python! " * 3
            print(repeated)  # Output: Python! Python! Python!
            \`\`\`End
        `
    },
    {
        "title": "Built-in methods for manipulating strings",
        "content": `
            \`\`\`Para
            Python provides a wide range of built-in methods for manipulating strings, making it easier to perform various text processing tasks.
            \`\`\`End
    
            \`\`\`Sub-topic
            Uppercase and Lowercase
            \`\`\`End
    
            \`\`\`Code
            text = "Hello, World"
            print(text.upper())  # Output: HELLO, WORLD
            print(text.lower())  # Output: hello, world
            \`\`\`End
    
            \`\`\`Sub-topic
            Stripping Whitespace
            \`\`\`End
    
            \`\`\`Para
            Removes leading/trailing spaces.
            \`\`\`End
    
            \`\`\`Code
            spaced = "  Python  "
            print(spaced.strip())   # Output: Python (without spaces)
            \`\`\`End
    
            \`\`\`Sub-topic
            Replacing Substrings
            \`\`\`End
    
            \`\`\`Para
            Replace parts of a string with another string.
            \`\`\`End
    
            \`\`\`Code
            sentence = "I like Python"
            print(sentence.replace("like", "love"))  # Output: I love Python
            \`\`\`End
    
            \`\`\`Sub-topic
            Finding Substrings
            \`\`\`End
    
            \`\`\`Para
            Returns the index of the first occurrence of a substring.
            \`\`\`End
    
            \`\`\`Code
            text = "Find the needle in the haystack"
            print(text.find("needle"))  # Output: 9 (index of the start of 'needle')
            \`\`\`End
    
            \`\`\`Sub-topic
            Splitting and Joining Strings
            \`\`\`End
    
            \`\`\`Para
            split(): Splits a string into a list based on a delimiter.
            \`\`\`End
    
            \`\`\`Code
            fruits = "apple,banana,orange"
            fruit_list = fruits.split(",")
            print(fruit_list)  # Output: ['apple', 'banana', 'orange']
            \`\`\`End
    
            \`\`\`Para
            join(): Joins a list of strings into a single string, with a delimiter.
            \`\`\`End
    
            \`\`\`Code
            words = ['Join', 'these', 'words']
            sentence = " ".join(words)
            print(sentence)  # Output: Join these words
            \`\`\`End
        `
    },
    {
        "title": "String Formatting",
        "content": `
            \`\`\`Para
            Python offers several ways to format strings, such as using the % operator, str.format() method, and f-strings.
            \`\`\`End
    
            \`\`\`Sub-topic
            Using % for formatting
            \`\`\`End
    
            \`\`\`Code
            name = "Alice"
            age = 30
            print("My name is %s and I am %d years old." % (name, age))  # Output: My name is Alice and I am 30 years old.
            \`\`\`End
    
            \`\`\`Sub-topic
            Using str.format()
            \`\`\`End
    
            \`\`\`Code
            print("My name is {} and I am {} years old.".format(name, age))  # Output: My name is Alice and I am 30 years old.
            \`\`\`End
    
            \`\`\`Sub-topic
            Using f-strings (introduced in Python 3.6)
            \`\`\`End
    
            \`\`\`Code
            print(f"My name is {name} and I am {age} years old.")  # Output: My name is Alice and I am 30 years old.
            \`\`\`End
        `
    },
    {
        "title": "Checking String Characteristics",
        "content": `
            \`\`\`Para
            In Python, checking string characteristics involves using built-in methods to determine certain properties or attributes of a string. These methods can help identify whether a string contains only alphabetic characters, digits, whitespace, or other patterns.
            \`\`\`End
    
            \`\`\`Sub-topic
            Check if string is alphabetic
            \`\`\`End
    
            \`\`\`Code
            word = "Python"
            print(word.isalpha())  # Output: True
            \`\`\`End
    
            \`\`\`Sub-topic
            Check if string contains digits
            \`\`\`End
    
            \`\`\`Code
            number = "12345"
            print(number.isdigit())  # Output: True
            \`\`\`End
        `
    },
    {
        "title": "Example of String Manipulation in Python",
        "content": `
            \`\`\`Code
            # String creation and basic manipulation
            text = "Hello, Python!"
            print(text[0])        # Output: H (indexing)
            print(text[7:13])     # Output: Python (slicing)
    
            # Changing case
            print(text.upper())   # Output: HELLO, PYTHON!
            print(text.lower())   # Output: hello, python!
    
            # Concatenation
            greeting = "Welcome to " + text
            print(greeting)       # Output: Welcome to Hello, Python!
    
            # Replacing a substring
            new_text = text.replace("Python", "World")
            print(new_text)       # Output: Hello, World!
    
            # Splitting and joining
            words = "apple, banana, cherry".split(", ")
            print(words)          # Output: ['apple', 'banana', 'cherry']
            joined = " | ".join(words)
            print(joined)         # Output: apple | banana | cherry
    
            # Using f-string for formatting
            name = "John"
            age = 25
            print(f"My name is {name} and I am {age} years old.")  # Output: My name is John and I am 25 years old.
            \`\`\`End
    
            \`\`\`Para
            In this example, we perform a variety of string manipulations, including indexing, slicing, changing the case, replacing substrings, splitting and joining strings, and formatting strings using f-strings. These operations demonstrate how flexible and powerful Python's string handling capabilities are.
            \`\`\`End
        `
    },
    {
        "title": "Decision Control Structures",
        "content": `
            \`\`\`Para
            Decision control structures in Python enable you to control the flow of your program based on conditions. These structures allow your code to make decisions and execute certain sections based on whether a given condition is True or False. The primary decision control structures in Python include if, elif, and else statements, which are used for conditional execution of code.
            \`\`\`End
    
            \`\`\`Sub-topic
            Types of Decision Control Structures
            \`\`\`End
    
            \`\`\`Sub-topic
            if Statement
            \`\`\`End
    
            \`\`\`Para
            The simplest decision control structure is the if statement. It is used to test a condition, and if the condition evaluates to True, the code block inside the if statement will be executed. If the condition evaluates to False, the block is skipped.
            \`\`\`End
    
            \`\`\`Code
            number = 10  # Assign a value to the variable
    
            # Check if the number is greater than 0
            if number > 0:
                print(f"{number} is positive.")  # If the condition is True, this message is printed
            \`\`\`End
    
            \`\`\`ListTitle
            Explanation
            \`\`\`List
            Here, the variable number is assigned the value 10.
            The if condition checks whether number > 0. Since the condition is True, it executes the indented block under the if, printing "10 is positive.".
            If the number were less than or equal to 0, the code inside the if block would not execute.
            \`\`\`End
    
            \`\`\`Sub-topic
            if-else Statement
            \`\`\`End
    
            \`\`\`Para
            The if-else statement provides an alternative action if the initial if condition is False. It allows handling both outcomes of a condition (True or False).
            \`\`\`End
    
            \`\`\`Code
            number = -5  # Assign a value to the variable
    
            # Check if the number is greater than 0
            if number > 0:
                print(f"{number} is positive.")  # If the condition is True, this message is printed
            else:
                print(f"{number} is negative.")  # If the condition is False, this message is printed
            \`\`\`End
    
            \`\`\`ListTitle
            Explanation
            \`\`\`List
            The program checks whether number > 0. In this case, since number is -5, the condition is False.
            The program skips the if block and executes the else block, printing "-5 is negative.".
            The else statement ensures that the program can take action when the if condition fails.
            \`\`\`End
    
            \`\`\`Sub-topic
            if-elif-else Statement
            \`\`\`End
    
            \`\`\`Para
            The if-elif-else structure is used to check multiple conditions sequentially. The elif (else if) clause allows additional checks when the first if condition fails. If one condition is True, the corresponding block is executed, and all remaining conditions are ignored.
            \`\`\`End
    
            \`\`\`Code
            number = 0  # Assign a value to the variable
    
            # Check if the number is greater than 0
            if number > 0:
                print(f"{number} is positive.")  # If the condition is True, this message is printed
    
            # Check if the number is less than 0
            elif number < 0:
                print(f"{number} is negative.")  # If the first condition is False and this one is True, this message is printed
    
            # If none of the above conditions are True, the number must be zero
            else:
                print(f"{number} is zero.")  # If both previous conditions are False, this message is printed
            \`\`\`End
    
            \`\`\`ListTitle
            Explanation
            \`\`\`List
            The program first checks if number > 0. Since number is 0, the condition is False.
            It then checks if number < 0. This condition is also False.
            Finally, the program executes the else block, as both previous conditions were False, printing "0 is zero.".
            This structure allows for multiple possible outcomes to be handled in a clear, sequential manner.
            \`\`\`End
    
            \`\`\`Sub-topic
            Nested if Statements
            \`\`\`End
    
            \`\`\`Para
            Sometimes, you may need to check multiple conditions within an already existing if block. In such cases, you can use nested if statements. These are if statements placed inside another if block.
            \`\`\`End
    
            \`\`\`Code
            number = 8  # Assign a value to the variable
    
            # First, check if the number is greater than 0
            if number > 0:
                # Nested condition: check if the number is divisible by 2 (even)
                if number % 2 == 0:
                    print(f"{number} is positive and even.")  # If both conditions are True, this message is printed
                else:
                    print(f"{number} is positive but odd.")  # If the first condition is True but this one is False, this message is printed
            else:
                print(f"{number} is not positive.")  # If the first condition is False, this message is printed
            \`\`\`End
    
            \`\`\`ListTitle
            Explanation
            \`\`\`List
            The first if block checks if number > 0. If True, it proceeds to check whether number % 2 == 0 (i.e., whether the number is even).
            If both conditions are True, it prints "8 is positive and even."
            If the number is positive but odd, it prints "8 is positive but odd."
            If the number is not positive (e.g., negative or zero), the outer else block handles that case.
            Nested if statements are useful for handling more complex decision-making scenarios where multiple conditions must be checked.
            \`\`\`End
        `
    },
    {
        "title": "Logical Operators with Decision Control Structures",
        "content": `
            \`\`\`Para
            You can combine conditions using logical operators (and, or, not) to create more complex decision-making processes.
            \`\`\`End
    
            \`\`\`ListTitle
            \`\`\`List
            and: Both conditions must be True for the block of code to execute.
            or: At least one condition must be True for the block of code to execute.
            not: Reverses the logical state of a condition.
            \`\`\`End
    
            \`\`\`Code
            age = 20  # Assign an age to the variable
            citizen = True  # Assign citizenship status (True means the person is a citizen)
    
            # Check if the person is at least 18 years old AND is a citizen
            if age >= 18 and citizen:
                print("You are eligible to vote.")  # If both conditions are True, this message is printed
            else:
                print("You are not eligible to vote.")  # If any condition is False, this message is printed
    
            # Check if the person is under 18 OR is not a citizen
            if age < 18 or not citizen:
                print("You cannot vote due to age or citizenship status.")  # If either condition is True, this message is printed
            else:
                print("You meet the basic requirements to vote.")  # If both conditions are False, this message is printed
            \`\`\`End
    
            \`\`\`ListTitle
            Key Points
            \`\`\`List
            if statement: Executes a block of code if a condition is True.
            else statement: Provides an alternative execution path if the if condition is False.
            elif statement: Checks additional conditions when the initial if condition is False.
            Logical operators: and, or, and not can combine multiple conditions in a decision control structure.
            Nested if statements: Enable checking multiple conditions within other conditions for more complex decision-making.
            \`\`\`End
    
            \`\`\`Para
            This allows Python programs to make decisions and execute specific blocks of code based on dynamic conditions and input, creating flexible and interactive programs.
            \`\`\`End
        `
    },
    {
        "title": "Relational Operators in Conditional Statements",
        "content": `
            \`\`\`Para
            Relational operators (also known as comparison operators) are used in Python to compare two values or expressions. The result of a relational operation is a Boolean value, meaning it evaluates to either True or False. These operators are often used in conditional statements (if, elif, else) to control the flow of the program based on comparisons.
            \`\`\`End
    
            \`\`\`Sub-topic
            Common Relational Operators in Python
            \`\`\`End
    
            \`\`\`Table
            | Operator    | Description                     | Example    |
            |-------------|---------------------------------|------------|
            | ==          | Equal to                        | a == b     |
            | !=          | Not equal to                    | a != b     |
            | >           | Greater than                    | a > b      |
            | <           | Less than                       | a < b      |
            | >=          | Greater than or equal to        | a >= b     |
            | <=          | Less than or equal to           | a <= b     |
            \`\`\`End
        `
    },
    {
        "title": "Using Relational Operators in Conditional Statements",
        "content": `
            \`\`\`Para
            Relational operators are frequently used in if statements to determine the execution of specific code blocks based on conditions.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example of Using Relational Operators in Conditional Statements
            \`\`\`End
    
            \`\`\`Code
            # Get user input for two numbers
            a = int(input("Enter the first number: "))
            b = int(input("Enter the second number: "))
    
            # Using relational operators in conditional statements
            if a == b:
                print("The numbers are equal.")
            elif a > b:
                print("The first number is greater than the second number.")
            else:
                print("The first number is less than the second number.")
    
            # Additional examples using various relational operators
            if a != b:
                print("The numbers are not equal.")
    
            if a >= b:
                print("The first number is greater than or equal to the second number.")
    
            if a <= b:
                print("The first number is less than or equal to the second number.")
            \`\`\`End
    
            \`\`\`Sub-topic
            Detailed Breakdown of the Example:
            \`\`\`End
    
            \`\`\`Para
            User Input: The program prompts the user to enter two numbers and converts them to integers.
            \`\`\`End
    
            \`\`\`Para
            First Condition (if a == b):
            \`\`\`End
            \`\`\`Para
            Checks if the two numbers are equal. If true, it prints "The numbers are equal."
            \`\`\`End
    
            \`\`\`Para
            Second Condition (elif a > b):
            \`\`\`End
            \`\`\`Para
            If the first condition is false, it checks if the first number is greater than the second number. If true, it prints "The first number is greater than the second number."
            \`\`\`End
    
            \`\`\`Para
            Else Statement:
            \`\`\`End
            \`\`\`Para
            If both previous conditions are false, it defaults to the else statement, printing "The first number is less than the second number."
            \`\`\`End
    
            \`\`\`Para
            Additional Conditions:
            \`\`\`End
            \`\`\`Para
            The program then checks if the numbers are not equal (!=), if the first number is greater than or equal to the second (>=), and if it is less than or equal to the second (<=), printing appropriate messages.
            \`\`\`End
        `
    },
    {
        "title": "Combining Relational Operators with Logical Operators",
        "content": `
            \`\`\`Para
            You can also combine relational operators with logical operators (and, or, not) to form more complex conditions.
            \`\`\`End
    
            \`\`\`Sub-title
            Example of Combining Relational Operators with Logical Operators
            \`\`\`End
    
            \`\`\`Code
            # Get user input for age and has_permission
            age = int(input("Enter your age: "))
            has_permission = input("Do you have permission? (yes/no): ").lower() == "yes"
    
            # Check if the person can enter
            if age >= 18 and has_permission:
                print("You can enter.")
            elif age < 18 and has_permission:
                print("You can enter, but only with adult supervision.")
            else:
                print("You cannot enter.")
            \`\`\`End
    
            \`\`\`Sub-topic
            Detailed Breakdown of the Combined Example:
            \`\`\`End
    
            \`\`\`Para
            User Input: The program gets the user's age and whether they have permission.
            \`\`\`End
    
            \`\`\`Para
            First Condition:
            \`\`\`End
            \`\`\`Para
            Checks if the user is at least 18 years old and has permission. If both conditions are true, it prints "You can enter."
            \`\`\`End
    
            \`\`\`Para
            Second Condition:
            \`\`\`End
            \`\`\`Para
            If the first condition is false, it checks if the user is under 18 but has permission. If true, it prints "You can enter, but only with adult supervision."
            \`\`\`End
    
            \`\`\`Para
            Else Statement:
            \`\`\`End
            \`\`\`Para
            If neither condition is satisfied, it prints "You cannot enter."
            \`\`\`End
    
            \`\`\`ListTitle
            Key Points:
            \`\`\`List
            Relational Operators: Used to compare two values, returning True or False.
            Common Operators: Include ==, !=, >, <, >=, and <=.
            Conditional Statements: Relational operators are primarily used in if, elif, and else statements to control program flow based on conditions.
            Combining Conditions: You can create more complex logical expressions by combining relational operators with logical operators.
            By utilizing relational operators in conditional statements, you can implement robust decision-making processes in your Python programs.
            \`\`\`End
        `
    },
    {
        "title": "Data Structures",
        "content": `
            \`\`\`Para
            Data structures are fundamental components of any programming language, allowing you to store, organize, and manage data efficiently. Python provides several built-in data structures that are easy to use and versatile for various applications. The most common data structures in 
            \`\`\`End
    
            \`\`\`ListTitle
            Python include:
            \`\`\`List
            Lists
            Tuples
            Sets
            Dictionaries
            \`\`\`End
    
            \`\`\`Para
            Each of these structures has different characteristics and is useful for different scenarios depending on the nature of the problem.
            \`\`\`End
        `
    },
    {
        "title": "Lists",
        "content": `
            \`\`\`Para
            Lists are one of the most versatile and commonly used data structures in Python. They are ordered, meaning that elements maintain the sequence in which they are added. Lists are also mutable, which allows them to grow or shrink as needed by adding, modifying, or removing elements. Furthermore, lists allow duplicate elements, which makes them suitable for scenarios where data redundancy is acceptable.
            \`\`\`End
    
            \`\`\`Para
            Use Case: Use lists when you need a dynamic array-like structure that can store multiple items and when the order of the items is important.
            \`\`\`End
    
            \`\`\`Code
            # Creating a list
            fruits = ["apple", "banana", "cherry"]
    
            # Accessing elements
            print(fruits[0])  # Output: apple
    
            # Modifying elements
            fruits[1] = "orange"
            print(fruits)  # Output: ['apple', 'orange', 'cherry']
    
            # Adding elements
            fruits.append("mango")
            print(fruits)  # Output: ['apple', 'orange', 'cherry', 'mango']
    
            # Removing elements
            fruits.remove("cherry")
            print(fruits)  # Output: ['apple', 'orange', 'mango']
    
            # Iterating through a list
            for fruit in fruits:
                print(fruit)
            \`\`\`End
        `
    },
    {
        "title": "Tuples",
        "content": `
            \`\`\`Para
            Tuples are similar to lists in that they are ordered collections. However, unlike lists, tuples are immutable, meaning that once a tuple is created, its content cannot be changed. This immutability makes tuples ideal for situations where the integrity of the data must be preserved throughout the program. Although tuples allow duplicate elements, their fixed nature makes them useful in cases where you want to prevent accidental modification.
            \`\`\`End
    
            \`\`\`Para
            Use Case: Use tuples when you need an ordered collection of elements that should not be altered after their creation, ensuring data stability.
            \`\`\`End
    
            \`\`\`Code
            # Creating a tuple
            coordinates = (10, 20)
    
            # Accessing elements
            print(coordinates[0])  # Output: 10
    
            # Tuples are immutable, so you cannot change the elements directly:
            # coordinates[0] = 15  # This would raise an error
    
            # Unpacking a tuple
            x, y = coordinates
            print(x, y)  # Output: 10 20
            \`\`\`End
        `
    },
    {
        "title": "Sets",
        "content": `
            \`\`\`Para
            Sets are unordered collections of unique elements. Unlike lists and tuples, sets do not allow duplicate values, making them perfect for storing collections where uniqueness is important. Sets are highly efficient for membership testing (i.e., checking if an element exists in the set) and performing operations like union, intersection, and difference between sets.
            \`\`\`End
    
            \`\`\`Para
            Use Case: Use sets when you need to store unique items, or when you need to efficiently perform set operations (like union, intersection) on collections of data.
            \`\`\`End
    
            \`\`\`Code
            # Creating a set
            numbers = {1, 2, 3, 4, 4}  # Duplicate '4' will be ignored
            print(numbers)  # Output: {1, 2, 3, 4}
    
            # Adding elements
            numbers.add(5)
            print(numbers)  # Output: {1, 2, 3, 4, 5}
    
            # Removing elements
            numbers.remove(3)
            print(numbers)  # Output: {1, 2, 4, 5}
    
            # Set operations
            set_a = {1, 2, 3}
            set_b = {3, 4, 5}
    
            # Union
            print(set_a | set_b)  # Output: {1, 2, 3, 4, 5}
    
            # Intersection
            print(set_a & set_b)  # Output: {3}
    
            # Difference
            print(set_a - set_b)  # Output: {1, 2}
            \`\`\`End
        `
    },
    {
        "title": "Dictionaries",
        "content": `
            \`\`\`Para
            Dictionaries are unordered collections of key-value pairs. Each key in a dictionary must be unique, although the associated values can be duplicated. Dictionaries provide fast lookups, making them ideal for mapping relationships between pieces of data, such as storing records where each key represents a field (e.g., name, age, city), and the value represents the corresponding data.
            \`\`\`End
    
            \`\`\`Para
            Use Case: Use dictionaries when you need to associate unique keys with specific values, such as creating a mapping or storing structured data (like a database or a JSON-like structure).
            \`\`\`End
    
            \`\`\`Code
            # Creating a dictionary
            person = {"name": "John", "age": 30, "city": "New York"}
    
            # Accessing values
            print(person["name"])  # Output: John
    
            # Modifying values
            person["age"] = 31
            print(person)  # Output: {'name': 'John', 'age': 31, 'city': 'New York'}
    
            # Adding new key-value pairs
            person["job"] = "Engineer"
            print(person)  # Output: {'name': 'John', 'age': 31, 'city': 'New York', 'job': 'Engineer'}
    
            # Removing a key-value pair
            del person["city"]
            print(person)  # Output: {'name': 'John', 'age': 31, 'job': 'Engineer'}
    
            # Iterating through a dictionary
            for key, value in person.items():
                print(f"{key}: {value}")
            \`\`\`End
        `
    },
    {
        "title": "Function Calls",
        "content": `
            \`\`\`Para
            A function in Python is a reusable block of code that performs a specific task. Functions help break down complex problems into smaller, manageable parts, making code modular, organized, and easier to maintain. Functions can take inputs (called arguments), perform actions, and return an output (or result).
            \`\`\`End
    
            \`\`\`Para
            In Python, you define a function using the def keyword, followed by the function name, parentheses, and a colon. The body of the function, containing the code to be executed, is indented.
            \`\`\`End
    
            \`\`\`Sub-topic
            Defining and Calling Functions
            \`\`\`End
    
            \`\`\`Para
            Syntax for Defining a Function:
            \`\`\`End
    
            \`\`\`Para
            def function_name(parameters):
            """Optional docstring to describe the function."""  
            # Function body  
            return result
            \`\`\`End
    
            \`\`\`Sub-Topic
            Example: Basic Function Definition and Call
            \`\`\`End
    
            \`\`\`Code
            # Defining a function that adds two numbers
            def add_numbers(a, b):
                return a + b
    
            # Calling the function
            result = add_numbers(3, 5)
            print(result)  # Output: 8
            \`\`\`End
    
            \`\`\`Para
            def keyword: This defines the function.
            \`\`\`End
    
            \`\`\`Para
            function_name: The name of the function (e.g., add_numbers).
            \`\`\`End
    
            \`\`\`Para
            Parameters: Variables passed into the function (e.g., a and b).
            \`\`\`End
    
            \`\`\`Para
            return statement: Returns a result to the caller of the function (optional but commonly used).
            \`\`\`End
        `
    },
    {
        "title": "Function Arguments",
        "content": `
            \`\`\`Para
            Functions can take zero or more arguments, which are passed when the function is called. There are different ways to pass arguments to functions.
            \`\`\`End
    
            \`\`\`Sub-topic
            Types of Function Arguments:
            \`\`\`End
    
            \`\`\`Para
            Positional Arguments: Arguments are passed in the order in which the parameters are defined.  
            Keyword Arguments: Arguments are passed by explicitly specifying the parameter names.  
            Default Arguments: Parameters with default values in case no argument is passed.  
            Variable-Length Arguments: Functions can accept an arbitrary number of positional (*args) or keyword arguments (**kwargs).
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Positional and Keyword Arguments
            \`\`\`End
    
            \`\`\`Code
            # Function with positional and keyword arguments
            def introduce(name, age):
                print(f"My name is {name} and I am {age} years old.")
    
            # Calling the function with positional arguments
            introduce("Alice", 25)  # Output: My name is Alice and I am 25 years old.
    
            # Calling the function with keyword arguments
            introduce(age=30, name="Bob")  # Output: My name is Bob and I am 30 years old.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Default Arguments
            \`\`\`End
    
            \`\`\`Code
            # Function with a default argument
            def greet(name, message="Hello"):
                print(f"{message}, {name}!")
    
            # Calling the function without providing the default argument
            greet("Alice")  # Output: Hello, Alice!
    
            # Calling the function with a custom message
            greet("Alice", "Good morning")  # Output: Good morning, Alice!
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Variable-Length Arguments (*args and **kwargs)
            \`\`\`End
    
            \`\`\`Code
            # Function with variable-length positional arguments (*args)
            def sum_numbers(*args):
                total = 0
                for num in args:
                    total += num
                return total
    
            # Calling the function with a variable number of arguments
            result = sum_numbers(1, 2, 3, 4, 5)
            print(result)  # Output: 15
    
            # Function with variable-length keyword arguments (**kwargs)
            def describe_person(**kwargs):
                for key, value in kwargs.items():
                    print(f"{key}: {value}")
    
            # Calling the function with keyword arguments
            describe_person(name="Alice", age=25, job="Engineer")
            # Output:
            # name: Alice
            # age: 25
            # job: Engineer
            \`\`\`End
        `
    },
    {
        "title": "Return Statement",
        "content": `
            \`\`\`Para
            The return statement is used to send back a result from the function to the caller. Once the return statement is executed, the function terminates.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Return Statement
            \`\`\`End
    
            \`\`\`Code
            # Function that returns the square of a number
            def square(number):
                return number ** 2
    
            # Storing the return value in a variable
            result = square(4)
            print(result)  # Output: 16
            A function can return multiple values as a tuple, which can be unpacked by the caller.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Returning Multiple Values
            \`\`\`End
    
            \`\`\`Code
            # Function that returns multiple values
            def calculate(a, b):
                sum_result = a + b
                diff_result = a - b
                return sum_result, diff_result
    
            # Unpacking the returned tuple
            sum_value, diff_value = calculate(10, 5)
            print(f"Sum: {sum_value}, Difference: {diff_value}")
            # Output: Sum: 15, Difference: 5
            \`\`\`End
        `
    },
    {
        "title": "Scope of Variables",
        "content": `
            \`\`\`Para
            Local Variables: Variables defined inside a function are local to that function. They cannot be accessed outside the function.
            \`\`\`End
    
            \`\`\`Para
            Global Variables: Variables defined outside of any function are global and can be accessed inside functions unless overridden by a local variable with the same name.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Scope of Variables
            \`\`\`End
    
            \`\`\`Code
            x = 10  # Global variable
    
            def my_function():
                x = 5  # Local variable
                print(f"Inside function: {x}")
    
            my_function()  # Output: Inside function: 5
            print(f"Outside function: {x}")  # Output: Outside function: 10
            \`\`\`End
        `
    },
    {
        "title": "Lambda Functions (Anonymous Functions)",
        "content": `
            \`\`\`Para
            Lambda functions are small, anonymous functions defined using the lambda keyword. They are typically used for short, simple operations.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Using Lambda Functions
            \`\`\`End
    
            \`\`\`Code
            # Lambda function to calculate the square of a number
            square = lambda x: x ** 2
            print(square(5))  # Output: 25
    
            # Lambda function used with the built-in sorted() function
            points = [(1, 2), (3, 1), (5, 0)]
            points_sorted = sorted(points, key=lambda point: point[1])
            print(points_sorted)  # Output: [(5, 0), (3, 1), (1, 2)]
            \`\`\`End
    
            \`\`\`Topic
            Recursion
            \`\`\`End
    
            \`\`\`Para
            A function can call itself, a process known as recursion. Recursion is useful for problems that can be divided into smaller subproblems of the same type.
            \`\`\`End
    
            \`\`\`Sub-topic
            Example: Recursive Function (Factorial)
            \`\`\`End
    
            \`\`\`Code
            # Recursive function to calculate the factorial of a number
            def factorial(n):
                if n == 0 or n == 1:
                    return 1
                else:
                    return n * factorial(n - 1)
    
            # Calling the recursive function
            result = factorial(5)
            print(result)  # Output: 120
            \`\`\`End
    
            \`\`\`Sub-topic
            Example Program: Using Functions in a Python Program
            \`\`\`End
    
            \`\`\`Code
            # Program to calculate the area and perimeter of a rectangle
    
            # Function to calculate area
            def calculate_area(length, width):
                return length * width
    
            # Function to calculate perimeter
            def calculate_perimeter(length, width):
                return 2 * (length + width)
    
            # Function to print the results
            def print_results(length, width):
                area = calculate_area(length, width)
                perimeter = calculate_perimeter(length, width)
                print(f"Area: {area}")
                print(f"Perimeter: {perimeter}")
    
            # Calling the functions
            length = 5
            width = 3
            print_results(length, width)
            \`\`\`End
    
            \`\`\`ListTitle
            Key Points:
            \`\`\`List
            Function Definition: Defined using the def keyword and can return values using return.
            Arguments: Can include positional, keyword, default, and variable-length arguments (*args, **kwargs).
            Return Values: Functions can return values, including multiple values.
            Scope: Variables defined within a function are local, while global variables are accessible throughout the program.
            Lambda Functions: Anonymous functions used for short operations.
            Recursion: A function can call itself for problems that have repetitive subproblems.
            \`\`\`End
    
            \`\`\`Para
            Functions are essential for organizing code, improving readability, reusability, and maintaining large Python projects effectively.
            \`\`\`End
        `
    },
    {
        "title": "Using Built-In Modules",
        "content": `
            \`\`\`Para
            Python has an extensive collection of built-in modules that make it easier to perform various operations, such as mathematical calculations, random number generation, file handling, date and time manipulation, and more. These modules are designed to provide functionality without the need to install any external libraries, making Python a powerful and versatile programming language right out of the box.
            \`\`\`End
    
            \`\`\`Para
            Two commonly used built-in modules are the math module, which provides mathematical functions, and the random module, which is used to generate random numbers. Let's take a closer look at each of these with examples.
            \`\`\`End
        `
    },
    {
        "title": "The math Module",
        "content": `
            \`\`\`Para
            The math module provides access to various mathematical functions and constants. It includes trigonometric functions (like sin, cos, and tan), logarithmic functions, exponential functions, and constants like pi and e. This module is useful for performing precise mathematical operations beyond Python's basic arithmetic operators.
            \`\`\`End
    
            \`\`\`Code
            import math  # Import the math module
    
            # Calculate the square root of 16 using math.sqrt()
            result = math.sqrt(16)
            print(result)  # Output: 4.0
    
            # Access the value of pi using math.pi
            print(math.pi)  # Output: 3.141592653589793
    
            # Calculate the sine of 90 degrees using math.sin() and math.radians()
            # math.radians() converts degrees to radians, as math functions expect input in radians
            print(math.sin(math.radians(90)))  # Output: 1.0 (since sin(90 degrees) = 1)
            \`\`\`End
    
            \`\`\`Sub-topic
            Explanation:
            \`\`\`End
    
            \`\`\`Para
            math.sqrt(16) computes the square root of 16, returning 4.0.
            \`\`\`End
    
            \`\`\`Para
            math.pi provides the constant value of pi (3.141592653589793).
            \`\`\`End
    
            \`\`\`Para
            math.radians(90) converts 90 degrees to radians, as trigonometric functions in the math module expect radians. The sine of 90 degrees is then computed as 1.0 using math.sin().
            \`\`\`End
    
            \`\`\`Para
            The math module is highly beneficial for scientific and engineering applications, where mathematical precision and complex functions are required.
            \`\`\`End
        `
    },
    {
        "title": "The random Module",
        "content": `
            \`\`\`Para
            The random module allows you to generate random numbers, shuffle lists, and make random choices. It is widely used in applications such as simulations, games, cryptography, or any situation where randomness is required. The module provides functions to generate random integers, floats, or select random elements from a sequence.
            \`\`\`End
    
            \`\`\`Code
            import random  # Import the random module
    
            # Generate a random integer between 1 and 10 using random.randint()
            random_number = random.randint(1, 10)
            print(random_number)  # Output: A random integer between 1 and 10
    
            # Generate a random float between 0 and 1 using random.random()
            random_float = random.random()
            print(random_float)  # Output: A random float between 0.0 and 1.0
            \`\`\`End
    
            \`\`\`Sub-topic
            Explanation:
            \`\`\`End
    
            \`\`\`Para
            random.randint(1, 10) generates a random integer between 1 and 10 (inclusive). Each time the program runs, a new random number is chosen from this range.
            \`\`\`End
    
            \`\`\`Para
            random.random() generates a random floating-point number between 0.0 and 1.0. This function is useful when you need to create a random fraction.
            \`\`\`End
    
            \`\`\`Sub-topic
            The random module also provides other useful functions, such as:
            \`\`\`End
    
            \`\`\`Para
            random.choice(): Selects a random element from a list or sequence.
            \`\`\`End
    
            \`\`\`Para
            random.shuffle(): Shuffles a list in place, changing the order of elements randomly.
            \`\`\`End
    
            \`\`\`Para 
            random.uniform(a, b): Generates a random floating-point number between two values a and b.
            \`\`\`End
    
            \`\`\`ListTitle
            Practical Use Cases for random Module:
            \`\`\`List
            Simulations: When you need to simulate randomness, such as rolling dice, drawing cards, or modeling probabilistic events.
            Games: For example, creating randomness in a game by placing items in random locations or generating random enemy encounters.
            Randomized Algorithms: Used in various algorithms that require random selection, such as Monte Carlo simulations.
            \`\`\`End
        `
    },
    {
        "title": "File Handling in Python",
        "content": `
            \`\`\`Para
            File handling refers to the process of opening, reading, writing, and closing files. Python provides several built-in functions and methods that make file operations straightforward. Files are an important way to store persistent data, such as logs, configurations, or datasets, that can be accessed by a Python program at any point.
            \`\`\`End
            \`\`\`Sub-topic
            Basic Operations with Files
            \`\`\`End
            \`\`\`Para
            There are four primary modes to work with files:
            \`\`\`End
            \`\`\`Para
            'r': Read mode (default). It opens the file for reading, and the file pointer is placed at the beginning of the file.
            \`\`\`End
            \`\`\`Para
            'w': Write mode. It opens the file for writing, overwriting the content if the file already exists.
            \`\`\`End
            \`\`\`Para
            'a': Append mode. It opens the file for writing but appends new content to the end of the file.
            \`\`\`End
            \`\`\`Para
            'b': Binary mode. It is used to work with binary files like images or executable files.
            \`\`\`End
            \`\`\`ListTitle
            Steps for File Handling:
            \`\`\`List
            Open the file: You can use the open() function to open a file in a specified mode.
            Perform file operations: Read or write content.
            Close the file: After completing the operations, it is essential to close the file to free up system resources.
            \`\`\`End
    
            \`\`\`Code
            # Open a file in write mode
            file = open("example.txt", "w")
    
            # Write some content to the file
            file.write("Hello, world!")
    
            # Always close the file to free up resources
            file.close()
            \`\`\`End
            \`\`\`Sub-topic
            Reading from a File
            \`\`\`End
            \`\`\`Para
            Python provides methods like read(), readline(), and readlines() to read data from files. The with statement is often used to ensure the file is properly closed after its contents are processed.
            \`\`\`End
    
            \`\`\`Code
            # Using 'with' to read from a file
            with open("example.txt", "r") as file:
                content = file.read()
                print(content)
            # read(): Reads the entire file content.
            # readline(): Reads a single line from the file.
            # readlines(): Reads all lines and returns them as a list of strings.
            \`\`\`End
            \`\`\`Sub-topic
            Writing to a File
            To write data to a file, use write() or writelines() methods. The mode 'w' is used to overwrite, while 'a' appends data.
            \`\`\`End
            \`\`\`Code
            # Append content to a file
            with open("example.txt", "a") as file:
                file.write("\nWelcome to Python File Handling!")
            \`\`\`End
        `
    },
    {
        "title": "Exception Handling in Python",
        "content": `
            \`\`\`Para
            Exception handling allows you to deal with runtime errors in a controlled way, ensuring your program doesn't crash unexpectedly. Exceptions occur when something goes wrong during the execution of a program (e.g., trying to divide by zero or access a file that doesn’t exist).
            \`\`\`End
            \`\`\`Sub-topic
            Why Use Exception Handling?
            \`\`\`End
            \`\`\`Para
            It helps manage errors gracefully.
            \`\`\`End
            \`\`\`Para
            It keeps the program running smoothly by handling anticipated and unanticipated problems.
            \`\`\`End
            \`\`\`Para
            Provides clear and meaningful error messages to users or developers.
            \`\`\`End
            \`\`\`Sub-topic
            Basic Structure of Exception Handling
            \`\`\`End
            \`\`\`Para
            In Python, exceptions are handled using the try-except block. You can add an optional else block that runs if no exception is raised, and a finally block to execute code no matter what happens (such as closing a file or releasing resources).
            \`\`\`End
            \`\`\`Code
            try:
                # Attempt to open a file that doesn't exist
                file = open("nonexistent_file.txt", "r")
            except FileNotFoundError:
                print("Error: File not found!")
            else:
                # This block executes if no exception is raised
                content = file.read()
                print(content)
            finally:
                # This block always executes, even if an exception occurs
                if 'file' in locals():
                    file.close()
            \`\`\`End
            \`\`\`ListTitle
            Commonly Used Exceptions in Python
            \`\`\`List
            FileNotFoundError: Raised when trying to access a file that does not exist.
            ZeroDivisionError: Raised when dividing by zero.
            ValueError: Raised when a function receives the correct type of argument but an inappropriate value.
            TypeError: Raised when an operation is applied to an object of an inappropriate type.
            \`\`\`End
            \`\`\`ListTitle
            Catching Multiple Exceptions
            \`\`\`End
            \`\`\`Para
            You can handle multiple exceptions by specifying different except blocks. This is useful when different types of errors might arise in a particular code block.
            \`\`\`End
            \`\`\`Code
            try:
                number = int(input("Enter a number: "))
                result = 100 / number
            except ValueError:
                print("Please enter a valid number!")
            except ZeroDivisionError:
                print("Cannot divide by zero!")
            else:
                print(f"Result: {result}")
            \`\`\`End
        `
    },
    {
        "title": "Combining File Handling and Exception Handling",
        "content": `
            \`\`\`Para
            When working with files, errors can frequently occur, such as trying to open a file that doesn’t exist, or attempting to read from a file that cannot be accessed. Exception handling makes it easy to anticipate and handle these issues gracefully, so the program doesn’t crash unexpectedly.
            \`\`\`End
            \`\`\`Sub-topic
            Example: Safe File Handling with Exception Handling
            \`\`\`End
            \`\`\`Code
            # Safely open and read from a file
            try:
                with open("data.txt", "r") as file:
                    content = file.read()
                    print(content)
            except FileNotFoundError:
                print("Error: The file you're trying to open does not exist!")
            except IOError:
                print("Error: Could not read the file!")
            \`\`\`End
            \`\`\`ListTitle
            In this example:
            \`\`\`List
            The program tries to open and read the file.
            If the file doesn’t exist, it catches a FileNotFoundError and prints an error message.
            If there’s any other input/output error (IOError), it handles that too.
            \`\`\`End
            \`\`\`ListTitle
            Best Practices
            \`\`\`List
            Use the with statement: Always use with for file handling to automatically close the file, even if an exception occurs.
            Handle Specific Exceptions: Be as specific as possible when handling exceptions to ensure you're not catching unintended errors.
            Always Close Resources: Use finally to ensure that external resources like files are always closed or released, even when an error occurs.
            Test for Errors: Anticipate potential errors like file not found, permission issues, or invalid inputs, and handle them using try-except.
            \`\`\`End
        `
    }
    ];
    
    export default lessons;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    