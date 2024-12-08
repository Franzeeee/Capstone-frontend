const rlessons = [
    {
        id: 0,
        title: "Introduction to R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
	     Introduction to R 
 	     \`\`\`End
            \`\`\`Para
           R is a powerful programming language and environment used for statistical computing, data analysis, and graphical representation. Originally developed by Ross Ihaka and Robert Gentleman in 1993, R has become one of the most popular tools for data scientists, statisticians, and analysts worldwide. It is widely used in fields such as bioinformatics, finance, and social sciences due to its robust statistical analysis capabilities and its wide range of built-in functions and packages.
            \`\`\`End
    
 	     \`\`\`Para
            R provides a rich ecosystem for manipulating data, performing complex statistical analyses, and creating visualizations. It supports a variety of data formats, including data frames, matrices, and lists, which allows users to work with data efficiently. The language is open-source, meaning that anyone can contribute to its development, leading to an ever-expanding library of packages that extend R’s functionality.
            \`\`\`End

            \`\`\`Bold
            Key features of R:
            \`\`\`End

 	     \`\`\`Para
           Statistical Analysis: R has an extensive set of functions for descriptive statistics, hypothesis testing, regression analysis, and time series analysis.
            \`\`\`End

 	     \`\`\`Para
Data Visualization: With packages like ggplot2 and base plotting functions, R allows users to create highly customizable and informative charts and graphs.
            \`\`\`End

 	     \`\`\`Para
Reproducible Research: R’s integration with R Markdown and other tools allows for the creation of dynamic reports that integrate code, output, and narrative.
            \`\`\`End

 	     \`\`\`Para
Package Ecosystem: The Comprehensive R Archive Network (CRAN) offers thousands of packages to extend R’s capabilities in fields like machine learning, data mining, and bioinformatics.
            \`\`\`End

            \`\`\`Bold
           Sample Code
            \`\`\`End

            \`\`\`Code
            # Create a simple dataset using a vector and a data frame
categories <- c("A", "B", "C", "D")
values <- c(23, 45, 56, 78)

# Combine the data into a data frame
data <- data.frame(Category = categories, Values = values)

# Display the dataset
print("Dataset:")
print(data)

# Perform a basic summary of the data
print("Summary of the data:")
summary(data)

# Calculate the mean and standard deviation of the values
mean_value <- mean(data$Values)
sd_value <- sd(data$Values)

print(paste("Mean of values:", mean_value))
print(paste("Standard deviation of values:", sd_value))

# Simple plot using base R functions
# Plot the data as a bar chart
barplot(data$Values, names.arg = data$Category, col = "skyblue", 
        main = "Bar Plot of Values", xlab = "Category", ylab = "Values")
            \`\`\`End
    `
    },
 {
        id: 1,
        title: "R Comments",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
	     R Comments
 	     \`\`\`End
	     
 	     \`\`\`Para
	     In R, comments are used to annotate code, making it more readable and understandable. Comments are ignored by R during execution, so they do not affect the program's output or performance. They are mainly for human readers to explain what the code does, why certain decisions were made, or to temporarily disable parts of the code.
            \`\`\`End

 	     \`\`\`Bold
	     Single-Line Comments
            \`\`\`End

 	     \`\`\`Para
	     A comment in R starts with the # symbol. Anything following the # on that line is considered a comment and is ignored by the R interpreter.
            \`\`\`End

 	     \`\`\`Bold
	     Example
            \`\`\`End

 	     \`\`\`Code
	     # This is a single-line comment
x <- 10  # Assigning 10 to variable x

            \`\`\`End

 	     \`\`\`Para
	     In this example, # This is a single-line comment and # Assigning 10 to variable x are both comments. R will ignore them during execution.
            \`\`\`End

 	     \`\`\`Bold
	     Multi-Line Comments
            \`\`\`End

 	     \`\`\`Para
	     R does not have a built-in syntax for multi-line comments, but you can use multiple single-line comments for this purpose. Simply start each line with #.
            \`\`\`End

 	     \`\`\`Code
	     # This is a multi-line comment
# explaining the purpose of the following code.
# The code calculates the sum of two numbers.

a <- 5  # First number
b <- 10  # Second number
sum <- a + b  # Calculate sum

            \`\`\`End

 	     \`\`\`Bold
	     Best Practices for Comments in R:
            \`\`\`End

 	     \`\`\`Para
	    Clarity: Write comments that clearly explain what the code does, especially if the logic is complex.
            \`\`\`End

 	     \`\`\`Para
     	    Consistency: Use comments consistently to annotate your code.
            \`\`\`End

 	     \`\`\`Para
	    Brevity: While comments should be descriptive, try to keep them concise.
            \`\`\`End

 	     \`\`\`Para
	    Avoid obvious comments: Avoid comments that simply restate what the code does. For example, x <- 5 # Assign 5 to x is redundant and doesn't add value.\n
            \`\`\`End

	    \`\`\`Para
	    Using comments effectively makes your R code easier to understand and maintain, both for yourself and for others who may work with your code.
            \`\`\`End
    `
    },
 {
        id: 2,
        title: "R Variables",
        hasAssessment: true,
        content: `

 	     \`\`\`Para
In R, variables are used to store data values. A variable is essentially a name that points to a value, which can be of various data types such as numbers, characters, logical values, or more complex structures like vectors, matrices, and data frames.
 	     \`\`\`End

 	     \`\`\`Bold
1. Variable Assignment
 	     \`\`\`End

 	     \`\`\`Para
To assign a value to a variable in R, the most common operator is <- (the arrow operator). You can also use = for assignment, but <- is preferred by many R users for clarity.
 	     \`\`\`End

 	     \`\`\`Bold
Assignment with <-:
 	     \`\`\`End

 	     \`\`\`Code
x <- 10      # Assigns the value 10 to variable x
name <- "Alice"  # Assigns the string "Alice" to the variable name
 	     \`\`\`End

 	     \`\`\`Para
Assignment with = (less common in R, but still valid):
 	     \`\`\`End

 	     \`\`\`Code
y = 20       # Assigns the value 20 to variable y
 	     \`\`\`End

 	     \`\`\`Para
Rightward assignment with -> (less common but valid):
 	     \`\`\`End

 	     \`\`\`Code
30 -> z      # Assigns the value 30 to variable z
 	     \`\`\`End

 	     \`\`\`Bold
2. Variable Names
 	     \`\`\`End

 	     \`\`\`Bold
In R, variable names must follow certain rules:
 	     \`\`\`End

 	     \`\`\`Para
Variable names can include letters (a-z, A-Z), numbers (0-9), and the period (.) or underscore (_).
 	     \`\`\`End

 	     \`\`\`Para
However, variable names cannot start with a number.
 	     \`\`\`End

 	     \`\`\`Para
Variable names are case-sensitive, meaning myVar and myvar would be considered different variables.
 	     \`\`\`End

 	     \`\`\`Para
Reserved words (keywords) such as if, else, TRUE, FALSE, function, etc., cannot be used as variable names.
 	     \`\`\`End

 	     \`\`\`Bold
Valid variable names:
 	     \`\`\`End

 	     \`\`\`Code
x <- 10
my_var <- 15
var1 <- 20
sum_value <- 25
 	     \`\`\`End

 	     \`\`\`Bold
Invalid variable names:
 	     \`\`\`End

 	     \`\`\`Code
1var <- 10  # Cannot start with a number
TRUE <- 5    # Cannot use reserved keywords as variable names
 	     \`\`\`End

 	     \`\`\`Bold
3. Data Types and Variables
 	     \`\`\`End

 	     \`\`\`Para
Variables in R can store different types of data. These include:
 	     \`\`\`End

 	     \`\`\`Para
Numeric: Used for real numbers (decimals).
 	     \`\`\`End

 	     \`\`\`Code
num <- 3.14  # Numeric variable
 	     \`\`\`End

 	     \`\`\`Para
Integer: Whole numbers are represented with an L suffix.
 	     \`\`\`End

 	     \`\`\`Code
int <- 5L    # Integer variable
 	     \`\`\`End

 	     \`\`\`Para
Character: Text values are enclosed in quotes (" " or ' ').
 	     \`\`\`End

 	     \`\`\`Code
name <- "Alice"  # Character variable
 	     \`\`\`End

 	     \`\`\`Para
Logical: Boolean values TRUE or FALSE.
 	     \`\`\`End

 	     \`\`\`Code
is_active <- TRUE   # Logical variable
 	     \`\`\`End

 	     \`\`\`Para
Complex: For complex numbers, you use the i suffix for the imaginary part.
 	     \`\`\`End

 	     \`\`\`Code
complex_num <- 2 + 3i  # Complex number
 	     \`\`\`End

 	     \`\`\`Bold
4. Variable Types and Structure
 	     \`\`\`End

 	     \`\`\`Para
R is a dynamically typed language, meaning the type of a variable is inferred from the value assigned to it, and you don't have to explicitly declare its type. The type of a variable can be checked using functions like class(), typeof(), and mode().
 	     \`\`\`End

 	     \`\`\`Bold
Check the type of a variable:
 	     \`\`\`End

 	     \`\`\`Code
x <- 10
class(x)   # Returns the class of the variable
typeof(x)  # Returns the underlying type of the variable
mode(x)    # Returns the mode of the variable
 	     \`\`\`End

 	     \`\`\`Bold
5. Vectors as Variables
 	     \`\`\`End

 	     \`\`\`Para
In R, variables can also store more complex data structures like vectors (which are lists of elements of the same type), matrices, data frames, and lists.
 	     \`\`\`End

 	     \`\`\`Para
Assigning a vector to a variable:
 	     \`\`\`End

 	     \`\`\`Code
vec <- c(1, 2, 3, 4)  # Vector of numeric values
 	     \`\`\`End

 	     \`\`\`Para
Assigning a character vector to a variable:
 	     \`\`\`End

 	     \`\`\`Code
names <- c("Alice", "Bob", "Charlie")  # Character vector
 	     \`\`\`End

 	     \`\`\`Bold
6. Variable Scope
 	     \`\`\`End

 	     \`\`\`Para
Variables in R can have either local scope or global scope, depending on where they are created and used.
 	     \`\`\`End

 	     \`\`\`Para
Global variables: Created outside functions or blocks and accessible from anywhere in the code.
 	     \`\`\`End


 	     \`\`\`Code
global_var <- 100   # Global variable
 	     \`\`\`End

 	     \`\`\`Para
Local variables: Defined inside functions and only accessible within that function's scope.
 	     \`\`\`End

 	     \`\`\`Code
my_function <- function() {
  local_var <- 200  # Local variable
  print(local_var)
}

my_function()      # Outputs: 200
 	     \`\`\`End

 	     \`\`\`Bold
7. Modifying Variables
 	     \`\`\`End

 	     \`\`\`Para
Variables can be modified simply by reassigning a new value to them.
 	     \`\`\`End

 	     \`\`\`Code
x <- 5
x <- x + 10   # x is now 15
 	     \`\`\`End

 	     \`\`\`Bold
8. Removing Variables
 	     \`\`\`End

 	     \`\`\`Para
If you no longer need a variable, you can remove it from the environment using the rm() function.
 	     \`\`\`End

 	     \`\`\`Code
x <- 10
rm(x)         # Removes the variable x
# x is now removed and attempting to use it will result in an error
 	     \`\`\`End

 	     \`\`\`Bold
9. Vectorized Operations with Variables
 	     \`\`\`End

 	     \`\`\`Para
In R, variables often hold vectors, and R supports vectorized operations, meaning you can perform operations on entire vectors without using loops.
 	     \`\`\`End

 	     \`\`\`Code
x <- c(1, 2, 3)
y <- c(4, 5, 6)

z <- x + y    # Element-wise addition: z will be c(5, 7, 9)
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Key Points:
 	     \`\`\`End

 	     \`\`\`Para
Variables are used to store data and are created using the assignment operator (<- or =).
 	     \`\`\`End

 	     \`\`\`Para
Variable names must start with a letter and cannot be a reserved word or start with a number.
 	     \`\`\`End

 	     \`\`\`Para
Variables can hold different data types (numeric, character, logical, etc.).
 	     \`\`\`End

 	     \`\`\`Para
R is dynamically typed, meaning variable types are inferred from their values.
 	     \`\`\`End

 	     \`\`\`Para
The type of a variable can be checked using functions like class(), typeof(), and mode().
 	     \`\`\`End

 	     \`\`\`Para
Variables can be global or local, depending on their scope.
 	     \`\`\`End

 	     \`\`\`Para
You can modify variables by reassigning them and remove them using rm().
 	     \`\`\`End

 	     \`\`\`Para
Understanding how variables work in R is crucial for performing data analysis, building functions, and creating more complex models in R.
 	     \`\`\`End
    `
    },
 {
        id: 3,
        title: "Data Types in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Data Types in R
 	     \`\`\`End

 	     \`\`\`Para
R is a dynamically typed language, meaning you don't need to declare the type of a variable when you create it. The type is inferred based on the value assigned to the variable. Here are the primary data types in R:
 	     \`\`\`End


 	     \`\`\`Bold
1. Numeric
 	     \`\`\`End

 	     \`\`\`Para
Numeric represents real numbers (decimals) in R. It is the default data type for numbers with a decimal point.
 	     \`\`\`End

 	     \`\`\`Code
x <- 10      # Numeric (integer value stored as numeric)
y <- 3.14    # Numeric (decimal value)
 	     \`\`\`End

 	     \`\`\`Para
Internally, both integers and floating-point numbers (decimals) are considered numeric by default.
 	     \`\`\`End

 	     \`\`\`Para
Note: R does not have a specific float type—both integers and decimals fall under the numeric category, but R distinguishes them when needed.
 	     \`\`\`End

 	     \`\`\`Bold
2. Integer
 	     \`\`\`End

 	     \`\`\`Para
Integer values are whole numbers. In R, integers are explicitly declared using the L suffix.
 	     \`\`\`End

 	     \`\`\`Code
a <- 5L   # Integer
b <- 100L  # Integer
 	     \`\`\`End

 	     \`\`\`Para
Without the L suffix, numbers are treated as numeric (floating-point).
 	     \`\`\`End

 	     \`\`\`Bold
3. Character
 	     \`\`\`End

 	     \`\`\`Para
Character represents textual data. It is used to store strings (sequences of characters).
 	     \`\`\`End

 	     \`\`\`Code
name <- "Alice"      # Character (string)
greeting <- "Hello"  # Character
 	     \`\`\`End

 	     \`\`\`Para
Strings are always enclosed in either double (" ") or single (' ') quotes.
 	     \`\`\`End

 	     \`\`\`End
4. Logical
 	     \`\`\`End

 	     \`\`\`End
Logical values represent boolean data. The two possible logical values are TRUE and FALSE.
 	     \`\`\`End

 	     \`\`\`End
is_active <- TRUE   # Logical value
is_valid <- FALSE   # Logical value
 	     \`\`\`End

 	     \`\`\`End
Logical values are often used for comparisons and conditional statements (e.g., if, while).
 	     \`\`\`End

 	     \`\`\`Bold
5. Complex
 	     \`\`\`End

 	     \`\`\`Para
Complex data type is used to store complex numbers. A complex number has a real part and an imaginary part.
 	     \`\`\`End

 	     \`\`\`Code
complex_num <- 3 + 2i   # Complex number: real part 3, imaginary part 2
 	     \`\`\`End

 	     \`\`\`Para
The imaginary part is denoted by i.
 	     \`\`\`End

 	     \`\`\`Bold
6. Raw
 	     \`\`\`End

 	     \`\`\`Para
Raw is used to represent raw byte data. It is not commonly used in general programming, but it is important for handling binary data.
 	     \`\`\`End

 	     \`\`\`Code
raw_data <- charToRaw("Hello")  # Converts string "Hello" to raw bytes
 	     \`\`\`End

 	     \`\`\`Bold
7. Special Data Types
 	     \`\`\`End

 	     \`\`\`Bold
NA (Not Available)
 	     \`\`\`End

 	     \`\`\`Para
NA represents a missing value. It is used for undefined or missing data in vectors, data frames, or matrices.
 	     \`\`\`End

 	     \`\`\`Code
x <- NA   # Represents a missing value
 	     \`\`\`End

 	     \`\`\`Bold
NULL
 	     \`\`\`End

 	     \`\`\`Para
NULL represents the absence of a value or object. It is different from NA, as NULL means the object does not exist, while NA represents an undefined value within an object.
 	     \`\`\`End

 	     \`\`\`Code
y <- NULL   # Represents the absence of a value
 	     \`\`\`End

 	     \`\`\`Bold
Inf and -Inf
 	     \`\`\`End

 	     \`\`\`Para
Inf (positive infinity) and -Inf (negative infinity) represent positive and negative infinite values, respectively.
 	     \`\`\`End

 	     \`\`\`Code
positive_infinity <- Inf   # Positive infinity
negative_infinity <- -Inf  # Negative infinity
 	     \`\`\`End

 	     \`\`\`Bold
8. Vectors (Special Type)
 	     \`\`\`End

 	     \`\`\`Para
A vector is a basic data structure in R. It can hold elements of the same type (numeric, character, logical, etc.).
 	     \`\`\`End

 	     \`\`\`Para
Numeric Vector: Stores numeric values.
 	     \`\`\`End

 	     \`\`\`Para
Character Vector: Stores strings.
 	     \`\`\`End

 	     \`\`\`Para
Logical Vector: Stores boolean values.
 	     \`\`\`End

 	     \`\`\`Code
# Numeric vector
num_vec <- c(1, 2, 3, 4, 5)

# Character vector
char_vec <- c("apple", "banana", "cherry")

# Logical vector
logical_vec <- c(TRUE, FALSE, TRUE)
 	     \`\`\`End

 	     \`\`\`Bold
9. Factors (Categorical Data Type)
 	     \`\`\`End

 	     \`\`\`Para
Factors are used to represent categorical data. A factor is an R data type for representing ordered or unordered categorical variables.
 	     \`\`\`End

 	     \`\`\`Code
gender <- factor(c("Male", "Female", "Male", "Female"))
 	     \`\`\`End

 	     \`\`\`Para
Factors are useful when working with categorical data, especially when performing statistical analysis, as they retain the levels of the variable.
 	     \`\`\`End

 	     \`\`\`Bold
10. Lists (Special Type)
 	     \`\`\`End

 	     \`\`\`Para
A list is an ordered collection of elements, but unlike vectors, elements in a list can be of different data types.
 	     \`\`\`End

 	     \`\`\`Code
my_list <- list(name = "John", age = 25, scores = c(90, 85, 88))
 	     \`\`\`End

 	     \`\`\`Para
Lists are flexible and are often used when you need to store heterogeneous data types.
 	     \`\`\`End

 	     \`\`\`Para
Understanding these basic data types is essential for manipulating and analyzing data in R. Each type has its own properties and methods for use, making R a powerful tool for statistical computing and data science.
 	     \`\`\`End
    `
    },
 {
        id: 4,
        title: "Numbers in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Numbers in R
 	     \`\`\`End

 	     \`\`\`Para
In R, numbers are used to represent various types of numerical data, and they are fundamental for performing mathematical operations, statistical analysis, and data manipulation. R primarily handles two types of numbers: numeric and integer.
 	     \`\`\`End

 	     \`\`\`Bold
1. Numeric
 	     \`\`\`End

 	     \`\`\`Para
Numeric is the default data type for numbers in R. It includes both integers and floating-point numbers (decimal values).
 	     \`\`\`End

 	     \`\`\`Para
R treats any number with a decimal point as a numeric value.
 	     \`\`\`End


 	     \`\`\`Code
num1 <- 5     # Numeric (integer value, treated as numeric)
num2 <- 3.14  # Numeric (floating-point number)
 	     \`\`\`End

 	     \`\`\`Para
Internally, both integers and floating-point numbers are considered numeric, but R distinguishes between the two types when necessary.
 	     \`\`\`End

 	     \`\`\`Bold
2. Integer
 	     \`\`\`End

 	     \`\`\`Para
Integer numbers are whole numbers, but they must be explicitly declared by adding the L suffix after the number.
 	     \`\`\`End

 	     \`\`\`Code
int1 <- 10L  # Integer value (must have the suffix L)
int2 <- 100L # Integer value
 	     \`\`\`End

 	     \`\`\`Para
If you do not add the L suffix, R will treat the value as a numeric (floating-point) type, even if the number appears as an integer.
 	     \`\`\`End

 	     \`\`\`Code
x <- 10     # Numeric (default)
class(x)    # Output: "numeric"

y <- 10L    # Integer
class(y)    # Output: "integer"
 	     \`\`\`End

 	     \`\`\`Bold
3. Arithmetic Operations
 	     \`\`\`End

 	     \`\`\`Para
R provides a wide range of operators for performing mathematical operations on numbers. These operations are vectorized, meaning they can be applied to entire vectors at once.
 	     \`\`\`End

 	     \`\`\`Bold
Basic Arithmetic Operators:
 	     \`\`\`End

 	     \`\`\`Bold
Addition: +
 	     \`\`\`End

 	     \`\`\`Code
x + y   # Adds x and y
 	     \`\`\`End

 	     \`\`\`Bold
Subtraction: -
 	     \`\`\`End

 	     \`\`\`Code
x - y   # Subtracts y from x
 	     \`\`\`End

 	     \`\`\`Bold
Multiplication: *
 	     \`\`\`End

 	     \`\`\`Code
x * y   # Multiplies x and y
 	     \`\`\`End

 	     \`\`\`Bold
Division: /
 	     \`\`\`End

 	     \`\`\`Code
x / y   # Divides x by y
 	     \`\`\`End

 	     \`\`\`Bold
Exponentiation: ^ or **
 	     \`\`\`End

 	     \`\`\`Code
x^y     # x raised to the power of y
 	     \`\`\`End

 	     \`\`\`Bold
Modulus (Remainder): %%
 	     \`\`\`End

 	     \`\`\`Code
x %% y  # Remainder when x is divided by y
 	     \`\`\`End

 	     \`\`\`Bold
Integer Division: %/%
 	     \`\`\`End

 	     \`\`\`Code
x %/% y # Quotient of x divided by y (without remainder)
 	     \`\`\`End


 	     \`\`\`Bold
Mathematical Functions:
 	     \`\`\`End

 	     \`\`\`Para
R also has many built-in mathematical functions to perform more advanced operations.
 	     \`\`\`End

 	     \`\`\`Bold
Square Root: sqrt()
 	     \`\`\`End

 	     \`\`\`Code
sqrt(16)   # Returns 4
 	     \`\`\`End

 	     \`\`\`Bold
Absolute Value: abs()
 	     \`\`\`End

 	     \`\`\`Code
abs(-5)    # Returns 5
 	     \`\`\`End

 	     \`\`\`Bold
Round a Number: round()
 	     \`\`\`End

 	     \`\`\`Code
round(3.14159, 2)  # Returns 3.14 (round to 2 decimal places)
 	     \`\`\`End

 	     \`\`\`Bold
Exponential: exp()
 	     \`\`\`End

 	     \`\`\`Code
exp(1)     # Returns e (Euler's number)
 	     \`\`\`End

 	     \`\`\`Bold
Logarithm: log()
 	     \`\`\`End

 	     \`\`\`Code
log(10)    # Natural logarithm of 10 (base e)
log10(100) # Logarithm of 100 with base 10
 	     \`\`\`End

 	     \`\`\`Bold
4. Special Numerical Values
 	     \`\`\`End

 	     \`\`\`Para
NA: Represents a missing value. If a number is missing or undefined, R will use NA to indicate this.
 	     \`\`\`End

 	     \`\`\`Code
x <- NA
 	     \`\`\`End

 	     \`\`\`Para
Inf and -Inf: Represent positive and negative infinity, respectively.
 	     \`\`\`End

 	     \`\`\`Code
positive_inf <- Inf   # Positive infinity
negative_inf <- -Inf  # Negative infinity
 	     \`\`\`End

 	     \`\`\`Para
NaN: Represents "Not a Number", which occurs when a mathematical operation results in an undefined or unrepresentable value (e.g., dividing 0 by 0).
 	     \`\`\`End

 	     \`\`\`Code
x <- 0 / 0  # NaN (Not a Number)
 	     \`\`\`End

 	     \`\`\`Bold
5. Precision and Accuracy
 	     \`\`\`End

 	     \`\`\`Para
When dealing with floating-point numbers (decimals), it’s important to note that they may not always represent exact values due to how computers handle floating-point arithmetic. For example, 0.1 + 0.2 in R may not return exactly 0.3 due to precision issues.
 	     \`\`\`End

 	     \`\`\`Bold
Example of floating-point precision issue:
 	     \`\`\`End

 	     \`\`\`Code
0.1 + 0.2   # Returns 0.30000000000000004, not exactly 0.3
 	     \`\`\`End

 	     \`\`\`Para
To deal with this issue, you can round numbers to a fixed number of decimal places using the round() function.
 	     \`\`\`End

 	     \`\`\`Code
round(0.1 + 0.2, 2)  # Returns 0.3
 	     \`\`\`End

 	     \`\`\`Bold
6. Vectors and Numbers
 	     \`\`\`End

 	     \`\`\`Para
R supports vectorized operations, which means operations can be performed on entire vectors of numbers, rather than on single values.
 	     \`\`\`End

 	     \`\`\`Bold
Example of vector addition:
 	     \`\`\`End

 	     \`\`\`Code
# Numeric vectors
x <- c(1, 2, 3)
y <- c(4, 5, 6)

z <- x + y   # Result: c(5, 7, 9)
 	     \`\`\`End

 	     \`\`\`Para
In this case, R performs element-wise addition, adding corresponding elements of x and y together.
 	     \`\`\`End

  	     \`\`\`Bold
7. Using Numbers in Data Frames
 	     \`\`\`End

 	     \`\`\`Para
In R, you often work with numbers in data frames. A data frame is a table or 2-dimensional structure where you can store and manipulate numerical data along with other types of data.
 	     \`\`\`End

 	     \`\`\`Code
df <- data.frame(
  Age = c(25, 30, 22),
  Height = c(175, 180, 160)
)

df$Age     # Access Age column (numeric data)
df$Height  # Access Height column (numeric data)
 	     \`\`\`End

 	     \`\`\`Bold
Summary of R Numbers:
 	     \`\`\`End

 	     \`\`\`Para
Numeric is the default type for numbers, which includes both integers and floating-point numbers.
 	     \`\`\`End

 	     \`\`\`Para
Integer values are whole numbers and must be explicitly defined with an L suffix.
 	     \`\`\`End

 	     \`\`\`Para
R supports a wide range of arithmetic operations: addition, subtraction, multiplication, division, exponentiation, and more.
 	     \`\`\`End

 	     \`\`\`Para
Special numbers like NA, Inf, -Inf, and NaN are used to represent missing values, infinities, and undefined results.
 	     \`\`\`End

 	     \`\`\`Para
R supports vectorized operations, which means you can perform operations on entire vectors of numbers at once.
 	     \`\`\`End

 	     \`\`\`Para
Mathematical functions like sqrt(), round(), exp(), and log() are commonly used for advanced operations.
 	     \`\`\`End

 	     \`\`\`Para
Floating-point precision issues can occur when dealing with decimal numbers, but these can be handled using functions like round().
 	     \`\`\`End

 	     \`\`\`Para
Numbers in R are essential for data analysis, statistical calculations, and mathematical modeling. Understanding how to work with numbers effectively is a key part of using R for data science.
 	     \`\`\`End
    `
    },
 {
        id: 5,
        title: "Strings in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Strings in R
 	     \`\`\`End

 	     \`\`\`Para
In R, strings are sequences of characters used to represent textual data. Strings are handled as character vectors, which means that each string in R is a vector of individual characters. R provides a variety of functions and operators for working with strings, including manipulation, transformation, and formatting.
 	     \`\`\`End

 	     \`\`\`Bold
1. Creating Strings
 	     \`\`\`End

 	     \`\`\`Para
Strings in R can be created using either single quotes (') or double quotes ("). Both types of quotes work the same way.
 	     \`\`\`End

 	     \`\`\`Code
# Using double quotes
string1 <- "Hello, World!"

# Using single quotes
string2 <- 'Hello, R!'
 	     \`\`\`End

 	     \`\`\`Para
Both string1 and string2 are considered character variables.
 	     \`\`\`End

 	     \`\`\`Bold
2. String Length
 	     \`\`\`End

 	     \`\`\`Para
The length of a string (i.e., the number of characters) can be obtained using the nchar() function.
 	     \`\`\`End

 	     \`\`\`Code
nchar(string1)  # Result: 13 (for "Hello, World!")
nchar(string2)  # Result: 9 (for "Hello, R!")
 	     \`\`\`End

 	     \`\`\`Para
This function returns the number of characters in the string, including spaces and punctuation.
 	     \`\`\`End

 	     \`\`\`Bold
3. String Concatenation
 	     \`\`\`End

 	     \`\`\`Para
Strings can be concatenated (combined) using the paste() or paste0() functions.
 	     \`\`\`End

 	     \`\`\`Para
paste(): This function concatenates strings and allows you to insert separators between them.
 	     \`\`\`End

 	     \`\`\`Code
# Concatenate strings with a space separator (default)
paste("Hello", "World!")  # Result: "Hello World!"
 	     \`\`\`End

 	     \`\`\`Para
paste0(): This function concatenates strings without any separator.
 	     \`\`\`End

 	     \`\`\`Code
# Concatenate strings without separator
paste0("Hello", "World!")  # Result: "HelloWorld!"
 	     \`\`\`End

 	     \`\`\`Para
You can also use the sep parameter to specify a custom separator:
 	     \`\`\`End

 	     \`\`\`Code
paste("Hello", "World", sep = "-")  # Result: "Hello-World"
 	     \`\`\`End

 	     \`\`\`Bold
4. String Subsetting
 	     \`\`\`End

 	     \`\`\`Para
Strings can be subset using indexing to access specific characters.
 	     \`\`\`End

 	     \`\`\`Para
Indexing a string: Use square brackets to access characters by their position (starting from 1).
 	     \`\`\`End

 	     \`\`\`Code
string1 <- "Hello, World!"

# Access the 1st character
string1[1]   # Result: "H"

# Access the 7th character
string1[7]   # Result: "W"
 	     \`\`\`End

 	     \`\`\`Para
Substring: To extract a substring from a string, use the substr() function, specifying the starting and ending position.
 	     \`\`\`End

 	     \`\`\`Code
substr(string1, 1, 5)   # Result: "Hello" (from position 1 to 5)
 	     \`\`\`End

 	     \`\`\`Bold
5. String Case Conversion
 	     \`\`\`End

 	     \`\`\`Para
You can change the case of a string using the following functions:
 	     \`\`\`End

 	     \`\`\`Para
tolower(): Converts all characters in a string to lowercase.
 	     \`\`\`End

 	     \`\`\`Code
tolower("Hello, World!")  # Result: "hello, world!"
 	     \`\`\`End

 	     \`\`\`Para
toupper(): Converts all characters in a string to uppercase.
 	     \`\`\`End

 	     \`\`\`Code
toupper("Hello, World!")  # Result: "HELLO, WORLD!"
 	     \`\`\`End

 	     \`\`\`Para
chartr(): This function allows you to replace characters in a string. It is used to translate or substitute specific characters.
 	     \`\`\`End

 	     \`\`\`Code
chartr("H", "h", "Hello")  # Result: "hello"
 	     \`\`\`End

 	     \`\`\`Bold
6. String Searching and Matching
 	     \`\`\`End

 	     \`\`\`Para
R provides functions to search for substrings or patterns within a string.
 	     \`\`\`End

 	     \`\`\`Para
grep(): Searches for a pattern in a string or vector of strings and returns the indices of the matches.
 	     \`\`\`End

 	     \`\`\`Code
# Find the index of the string containing "World"
grep("World", string1)  # Result: 1 (because "Hello, World!" contains "World")
 	     \`\`\`End

 	     \`\`\`Para
grepl(): Similar to grep(), but returns TRUE or FALSE instead of the index.
 	     \`\`\`End

 	     \`\`\`Code
grepl("World", string1)  # Result: TRUE
 	     \`\`\`End

 	     \`\`\`Para
regexpr(): Searches for the first match of a regular expression within a string and returns the position of the first match.
 	     \`\`\`End

 	     \`\`\`Code
regexpr("World", string1)  # Result: 8 (position where "World" starts)
 	     \`\`\`End

 	     \`\`\`Para
sub() and gsub(): These functions allow you to substitute a pattern with a replacement string.
 	     \`\`\`End

 	     \`\`\`Para
sub(): Replaces the first match of a pattern.
 	     \`\`\`End

 	     \`\`\`Para
gsub(): Replaces all matches of a pattern.
 	     \`\`\`End

 	     \`\`\`Code
sub("World", "R", string1)  # Result: "Hello, R!" (replaces the first "World")
gsub("o", "0", string1)     # Result: "Hell0, W0rld!" (replaces all "o" characters)
 	     \`\`\`End

 	     \`\`\`Bold
7. String Splitting
 	     \`\`\`End

 	     \`\`\`Para
The strsplit() function can be used to split a string into a list of substrings based on a delimiter (such as a space, comma, or any other pattern).
 	     \`\`\`End

 	     \`\`\`Code
string <- "apple, banana, cherry"

# Split string by commas
strsplit(string, ", ")  # Result: list(c("apple", "banana", "cherry"))
 	     \`\`\`End

 	     \`\`\`Bold
8. String Formatting
 	     \`\`\`End

 	     \`\`\`Para
R provides the sprintf() function to format strings in a similar way to the printf() function in other programming languages.
 	     \`\`\`End

 	     \`\`\`Para
sprintf(): Formats a string with specific formatting options.
 	     \`\`\`End

 	     \`\`\`Code
sprintf("The value of pi is approximately %.2f", pi)  # Result: "The value of pi is approximately 3.14"
 	     \`\`\`End

 	     \`\`\`Para
Here, %.2f specifies that pi should be displayed as a floating-point number with 2 decimal places.
	     \`\`\`End

 	     \`\`\`Bold
9. Removing Whitespaces
 	     \`\`\`End

 	     \`\`\`Para
You can remove leading and trailing spaces using the trimws() function.
 	     \`\`\`End

 	     \`\`\`Code
string <- "  Hello, World!  "
trimws(string)  # Result: "Hello, World!" (without leading and trailing spaces)
 	     \`\`\`End

 	     \`\`\`Bold
10. String Encoding and Special Characters
 	     \`\`\`End

 	     \`\`\`Para
Strings in R can include special characters, such as newline (\n) or tab (\t), by using escape sequences.
 	     \`\`\`End

 	     \`\`\`Para
Newline: \n (starts a new line)
 	     \`\`\`End

 	     \`\`\`Code
cat("Hello\nWorld!")  # Result: prints "Hello" on one line and "World!" on the next line
 	     \`\`\`End

 	     \`\`\`Para
Tab: \t (adds a tab space)
 	     \`\`\`End

 	     \`\`\`Code
cat("Hello\tWorld!")  # Result: "Hello    World!" (with a tab space between)
 	     \`\`\`End

 	     \`\`\`Para
Escape a quote: Use \\ to escape a quote within a string.
 	     \`\`\`End

 	     \`\`\`Code
string <- "He said, \"Hello, World!\""
print(string)  # Result: "He said, "Hello, World!""
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Working with Strings in R:
 	     \`\`\`End

 	     \`\`\`Para
Strings are created using single (') or double (") quotes.
 	     \`\`\`End

 	     \`\`\`Para
Functions like nchar(), substr(), paste(), and paste0() are used for string manipulation.
 	     \`\`\`End

 	     \`\`\`Para
You can convert string case using tolower() and toupper().
 	     \`\`\`End

 	     \`\`\`Para
String searching and pattern matching can be done using grep(), grepl(), regexpr(), sub(), and gsub().
 	     \`\`\`End

 	     \`\`\`Para
The strsplit() function allows splitting strings into substrings based on a delimiter.
 	     \`\`\`End

 	     \`\`\`Para
String formatting is handled by sprintf().
 	     \`\`\`End

 	     \`\`\`Para
Whitespace can be removed using trimws(), and special characters are managed using escape sequences like \n (new line) and \t (tab).
 	     \`\`\`End

 	     \`\`\`Para
Strings in R are essential for handling textual data, and mastering these functions enables you to effectively manipulate and process text for data analysis, report generation, and other tasks.
 	     \`\`\`End
    `
    },
 {
        id: 6,
        title: "Booleans in R",
        hasAssessment: true,
        content: `
 	     \`\`\`End
Booleans in R
 	     \`\`\`End

 	     \`\`\`End
In R, Boolean values (also referred to as logical values) represent truth values, which are typically either TRUE or FALSE. They are crucial in control structures, conditional statements, and logical operations.
 	     \`\`\`End

 	     \`\`\`Bold
1. Boolean Values
 	     \`\`\`End

 	     \`\`\`Para
In R, the Boolean values are:
 	     \`\`\`End

 	     \`\`\`Para
TRUE: Represents truth, which is equivalent to 1 in a mathematical context.
 	     \`\`\`End

 	     \`\`\`Para
FALSE: Represents falsehood, which is equivalent to 0 in a mathematical context.
 	     \`\`\`End

 	     \`\`\`Code
# Assigning Boolean values
bool1 <- TRUE
bool2 <- FALSE

# Print the values
print(bool1)  # Result: TRUE
print(bool2)  # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
These Boolean values are often used to control the flow of programs, like in conditional statements and loops.
 	     \`\`\`End

 	     \`\`\`Bold
2. Logical Operators
 	     \`\`\`End

 	     \`\`\`Para
Logical operators in R are used to perform comparisons and combine multiple logical expressions. They include:
 	     \`\`\`End

 	     \`\`\`Para
AND (& or &&): Returns TRUE if both conditions are true.
 	     \`\`\`End

 	     \`\`\`Para
& is vectorized (works element-wise), while && evaluates only the first element.
 	     \`\`\`End

 	     \`\`\`Code
# Element-wise AND
c(TRUE, FALSE, TRUE) & c(TRUE, TRUE, FALSE)  # Result: TRUE FALSE FALSE

# Single element AND (evaluates only the first element)
TRUE && FALSE  # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
OR (| or ||): Returns TRUE if at least one of the conditions is true.
 	     \`\`\`End

 	     \`\`\`Para
| is vectorized, while || evaluates only the first element.
 	     \`\`\`End

 	     \`\`\`Code
# Element-wise OR
c(TRUE, FALSE, TRUE) | c(FALSE, FALSE, TRUE)  # Result: TRUE FALSE TRUE

# Single element OR (evaluates only the first element)
TRUE || FALSE  # Result: TRUE
 	     \`\`\`End

 	     \`\`\`Para
NOT (!): Reverses the Boolean value.
 	     \`\`\`End

 	     \`\`\`Code
!TRUE   # Result: FALSE
!FALSE  # Result: TRUE
 	     \`\`\`End

 	     \`\`\`Code
3. Logical Comparison Operators
 	     \`\`\`End

 	     \`\`\`Para
Logical comparison operators are used to compare two values or vectors element-wise and return a Boolean result:
 	     \`\`\`End

 	     \`\`\`Para
Equal to: ==
 	     \`\`\`End

 	     \`\`\`Code
5 == 5   # Result: TRUE
5 == 6   # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
Not equal to: !=
 	     \`\`\`End

 	     \`\`\`Code
5 != 6  # Result: TRUE
5 != 5  # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
Greater than: >
 	     \`\`\`End

 	     \`\`\`Code
5 > 3   # Result: TRUE
3 > 5   # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
Less than: <
 	     \`\`\`End

 	     \`\`\`Code
3 < 5   # Result: TRUE
5 < 3   # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
Greater than or equal to: >=
 	     \`\`\`End

 	     \`\`\`Code
5 >= 5  # Result: TRUE
4 >= 5  # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Para
Less than or equal to: <=
 	     \`\`\`End

 	     \`\`\`Code
4 <= 5  # Result: TRUE
6 <= 5  # Result: FALSE
 	     \`\`\`End

 	     \`\`\`Bold
4. Logical Vectors
 	     \`\`\`End

 	     \`\`\`Para
R allows you to perform element-wise logical operations on vectors. Logical vectors are vectors that contain Boolean values (TRUE or FALSE).
 	     \`\`\`End

 	     \`\`\`Code
# Creating a logical vector
logical_vector <- c(TRUE, FALSE, TRUE, TRUE, FALSE)

# Operations on logical vectors
sum(logical_vector)  # Result: 3 (TRUE is treated as 1, FALSE as 0)
mean(logical_vector) # Result: 0.6 (average of TRUE/FALSE values)
 	     \`\`\`End

 	     \`\`\`Bold
5. Control Structures with Boolean Values
 	     \`\`\`End

 	     \`\`\`Para
Booleans are often used in control structures like if and while statements.
 	     \`\`\`End

 	     \`\`\`Bold
Using if statements
 	     \`\`\`End

 	     \`\`\`Para
The if statement in R allows you to execute code based on a Boolean condition:
 	     \`\`\`End

 	     \`\`\`Code
x <- 5
if (x > 3) {
  print("x is greater than 3")  # This will be printed
} else {
  print("x is not greater than 3")
}
 	     \`\`\`End

 	     \`\`\`Bold
Using ifelse() for conditional assignment
 	     \`\`\`End

 	     \`\`\`Para
ifelse() is a vectorized function that allows you to assign values based on a logical condition.
 	     \`\`\`End

 	     \`\`\`Code
# Assign a value based on the condition
x <- 5
result <- ifelse(x > 3, "Greater", "Lesser")
print(result)  # Result: "Greater"
 	     \`\`\`End

 	     \`\`\`Bold
This function takes three arguments:
 	     \`\`\`End

 	     \`\`\`Para
A logical condition (x > 3).
 	     \`\`\`End

 	     \`\`\`Para
A value to return if the condition is TRUE.
 	     \`\`\`End

 	     \`\`\`Para
A value to return if the condition is FALSE.
 	     \`\`\`End

 	     \`\`\`Bold
6. NA (Not Available)
 	     \`\`\`End

 	     \`\`\`Para
In R, NA represents a missing or undefined value. It is not the same as FALSE. Logical operations with NA usually return NA if the condition is unknown.
 	     \`\`\`End

 	     \`\`\`Code
x <- NA
isTRUE(x)    # Result: NA (not known if NA is TRUE)
isFALSE(x)   # Result: NA (not known if NA is FALSE)
 	     \`\`\`End

 	     \`\`\`Para
To handle missing values, you can use functions like is.na() to check if a value is NA.
 	     \`\`\`End

 	     \`\`\`Code
x <- NA
is.na(x)  # Result: TRUE
 	     \`\`\`End

 	     \`\`\`Bold
7. Examples of Logical Operations
 	     \`\`\`End

 	     \`\`\`Para
Here are some common use cases for Boolean logic in R:
 	     \`\`\`End

 	     \`\`\`Para
Filtering Data: Use logical conditions to filter rows in a data frame.
 	     \`\`\`End

 	     \`\`\`Code
# Create a data frame
df <- data.frame(
  Name = c("Alice", "Bob", "Charlie", "David"),
  Age = c(23, 35, 29, 41)
)

# Filter rows where Age is greater than 30
df[df$Age > 30, ]
 	     \`\`\`End

 	     \`\`\`End
Logical Indexing: Create logical vectors to index or subset data.
 	     \`\`\`End

 	     \`\`\`Code
x <- c(10, 20, 30, 40, 50)

# Create a logical vector
logical_vector <- x > 30

# Subset based on logical vector
x[logical_vector]  # Result: 40 50
 	     \`\`\`End

 	     \`\`\`Para
Combining Conditions: Use logical operators to combine multiple conditions.
 	     \`\`\`End

 	     \`\`\`Code
# Combining conditions using AND (&) and OR (|)
df[df$Age > 25 & df$Age < 40, ]  # Rows where age is between 25 and 40
 	     \`\`\`End
`
    },
 {
        id: 7,
        title: "if and else Statements in R",
        hasAssessment: true,
        content: `

 	     \`\`\`End
if and else Statements in R
 	     \`\`\`End

 	     \`\`\`End
In R, the if and else statements are used for conditional execution. They allow the program to choose between different actions based on whether a condition evaluates to TRUE or FALSE.
 	     \`\`\`End

 	     \`\`\`Bold
1. Basic if Statement
 	     \`\`\`End

 	     \`\`\`Para
An if statement evaluates a condition, and if the condition is TRUE, the code inside the block is executed. If the condition is FALSE, the code inside the block is skipped.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
if (condition) {
  # Code to execute if condition is TRUE
}
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- 5
if (x > 3) {
  print("x is greater than 3")
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
x is greater than 3
 	     \`\`\`End

 	     \`\`\`Para
Here, since x is 5 (greater than 3), the condition evaluates to TRUE, and the code inside the if block is executed.
 	     \`\`\`End

 	     \`\`\`Bold
2. if...else Statement
 	     \`\`\`End

 	     \`\`\`Para
An if statement can be followed by an else block, which will execute if the condition evaluates to FALSE. This provides an alternative action when the condition is not met.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
if (condition) {
  # Code to execute if condition is TRUE
} else {
  # Code to execute if condition is FALSE
}
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- 2
if (x > 3) {
  print("x is greater than 3")
} else {
  print("x is not greater than 3")
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
x is not greater than 3
 	     \`\`\`End

 	     \`\`\`Para
In this case, since x is 2 (not greater than 3), the condition is FALSE, and the code inside the else block is executed.
 	     \`\`\`End

 	     \`\`\`Bold
3. if...else if...else Chain
 	     \`\`\`End

 	     \`\`\`Para
You can use multiple else if statements to check for multiple conditions. This allows you to test several conditions in sequence.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
if (condition1) {
  # Code to execute if condition1 is TRUE
} else if (condition2) {
  # Code to execute if condition2 is TRUE
} else {
  # Code to execute if none of the conditions are TRUE
}
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- 7
if (x > 10) {
  print("x is greater than 10")
} else if (x == 7) {
  print("x is equal to 7")
} else {
  print("x is less than 7")
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
x is equal to 7
 	     \`\`\`End

 	     \`\`\`Para
Here, the condition x == 7 is TRUE, so the second block is executed. If neither condition was TRUE, the code in the final else block would run.
 	     \`\`\`End

 	     \`\`\`Bold
4. Nested if Statements
 	     \`\`\`End

 	     \`\`\`Para
You can also nest if statements inside each other to handle more complex conditions.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
if (condition1) {
  if (condition2) {
    # Code to execute if both condition1 and condition2 are TRUE
  } else {
    # Code to execute if condition1 is TRUE and condition2 is FALSE
  }
} else {
  # Code to execute if condition1 is FALSE
}
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- 5
y <- 10
if (x > 3) {
  if (y > 5) {
    print("Both x is greater than 3 and y is greater than 5")
  } else {
    print("x is greater than 3, but y is not greater than 5")
  }
} else {
  print("x is not greater than 3")
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
Both x is greater than 3 and y is greater than 5
 	     \`\`\`End

 	     \`\`\`Para
In this example, since both conditions x > 3 and y > 5 are true, the nested if block is executed.
 	     \`\`\`End

 	     \`\`\`Bold
5. Using ifelse() for Vectorized Conditional Evaluation
 	     \`\`\`End

 	     \`\`\`Para
In R, the ifelse() function is a vectorized version of the if-else statement. It allows you to apply a condition to each element of a vector or data frame and return a value depending on whether the condition is TRUE or FALSE.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
ifelse(condition, value_if_true, value_if_false)
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- c(5, 2, 8, 10)
result <- ifelse(x > 5, "Greater", "Smaller or equal")
print(result)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] "Smaller or equal" "Smaller or equal" "Greater"          "Greater"
 	     \`\`\`End

 	     \`\`\`Para
Here, the ifelse() function checks each element of the vector x and returns "Greater" if the value is greater than 5, and "Smaller or equal" otherwise.
 	     \`\`\`End

 	     \`\`\`Bold
Summary
 	     \`\`\`End

 	     \`\`\`Para
The if statement is used to execute code if a condition is TRUE.
 	     \`\`\`End

 	     \`\`\`Para
The else statement provides an alternative action if the condition is FALSE.
 	     \`\`\`End

 	     \`\`\`Para
You can chain multiple conditions using else if to check for more than one condition.
 	     \`\`\`End

 	     \`\`\`Para
if statements can be nested inside each other to create more complex decision structures.
 	     \`\`\`End

 	     \`\`\`Para
ifelse() is a vectorized function for applying a condition to each element of a vector or data structure and returning different values based on the condition.
 	     \`\`\`End

 	     \`\`\`Para
These tools allow you to implement complex decision-making processes in R, which are essential for controlling the flow of your program based on different conditions.
 	     \`\`\`End
    `
    },
 {
        id: 8,
        title: "Loops in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Loops in R
 	     \`\`\`End

 	     \`\`\`Para
Loops in R allow you to repeatedly execute a block of code based on certain conditions. They are useful when you need to perform repetitive tasks, like iterating over a list or performing calculations for each element of a vector or matrix.
 	     \`\`\`End
 	     \`\`\`Bold
R has three main types of loops:
 	     \`\`\`End

 	     \`\`\`Para
for loop
 	     \`\`\`End

 	     \`\`\`Para
while loop
 	     \`\`\`End

 	     \`\`\`Para
repeat loop
 	     \`\`\`End

 	     \`\`\`Para
Each loop serves different purposes and is used in different situations.
 	     \`\`\`End


 	     \`\`\`Bold
1. for Loop
 	     \`\`\`End

 	     \`\`\`Para
The for loop is used to iterate over a sequence (e.g., a vector, list, or range of numbers) and execute the same block of code for each element in the sequence.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
for (variable in sequence) {
  # Code to execute
}
 	     \`\`\`End

 	     \`\`\`Para
variable: A temporary variable that will take the value of each element in the sequence in each iteration.
 	     \`\`\`End

 	     \`\`\`Para
sequence: The set of elements (e.g., numbers, vectors, or lists) that the loop will iterate over.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Print numbers 1 through 5
for (i in 1:5) {
  print(i)
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
 	     \`\`\`End

 	     \`\`\`Para
In this example, i takes values from 1 to 5 in each iteration, and print(i) is executed for each value.
 	     \`\`\`End

 	     \`\`\`Bold
2. while Loop
 	     \`\`\`End

 	     \`\`\`Para
The while loop continues to execute as long as a given condition evaluates to TRUE. Once the condition becomes FALSE, the loop stops.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
while (condition) {
  # Code to execute
}
 	     \`\`\`End

 	     \`\`\`Para
condition: A logical expression that will be checked before each iteration.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Print numbers 1 through 5 using a while loop
i <- 1
while (i <= 5) {
  print(i)
  i <- i + 1
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
 	     \`\`\`End

 	     \`\`\`Para
Here, the loop continues as long as i <= 5. After printing each number, i is incremented by 1 until the condition i <= 5 becomes FALSE.
 	     \`\`\`End

 	     \`\`\`Bold
3. repeat Loop
 	     \`\`\`End

 	     \`\`\`Para
The repeat loop is an infinite loop that will continue executing until a break statement is encountered. The loop does not check the condition before execution; instead, it runs indefinitely and checks for the break condition at each iteration.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
repeat {
  # Code to execute
  if (condition) {
    break  # Exit the loop
  }
}
 	     \`\`\`End

 	     \`\`\`Para
condition: A logical expression that will determine when the loop should stop by triggering the break statement.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Print numbers 1 through 5 using a repeat loop
i <- 1
repeat {
  print(i)
  i <- i + 1
  if (i > 5) {
    break  # Exit the loop when i is greater than 5
  }
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
 	     \`\`\`End

 	     \`\`\`Para
In this case, the loop runs indefinitely until i exceeds 5, at which point the break statement stops the loop.
 	     \`\`\`End

 	     \`\`\`Bold
4. Loop Control: break and next
 	     \`\`\`End

 	     \`\`\`Para
R provides two important control statements to manage the flow of loops:
 	     \`\`\`End

 	     \`\`\`Para
break: Terminates the loop and exits out of it immediately.
 	     \`\`\`End

 	     \`\`\`Para
next: Skips the current iteration and moves on to the next iteration of the loop.
 	     \`\`\`End

 	     \`\`\`Bold
Example with break:
 	     \`\`\`End

 	     \`\`\`Code
# Stop the loop when the number 3 is encountered
for (i in 1:5) {
  if (i == 3) {
    break  # Exit the loop when i equals 3
  }
  print(i)
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] 1
[1] 2
 	     \`\`\`End

 	     \`\`\`Para
Here, the loop stops as soon as i equals 3.
 	     \`\`\`End

 	     \`\`\`Bold
Example with next:
 	     \`\`\`End

 	     \`\`\`Code
# Skip the number 3 and print the other numbers
for (i in 1:5) {
  if (i == 3) {
    next  # Skip the iteration when i equals 3
  }
  print(i)
}
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1] 1
[1] 2
[1] 4
[1] 5
 	     \`\`\`End

 	     \`\`\`Para
In this example, when i equals 3, the next statement is executed, and the loop skips that iteration, continuing with the next value.
 	     \`\`\`End


 	     \`\`\`Bold
5. Vectorized Operations and Loops
 	     \`\`\`End

 	     \`\`\`Para
In R, it's often more efficient to use vectorized operations instead of loops. Vectorized operations allow you to perform operations on entire vectors or matrices without explicitly writing loops.
 	     \`\`\`End

 	     \`\`\`Bold
Example (without loop):
 	     \`\`\`End

 	     \`\`\`Code
# Squaring each element of a vector without using a loop
numbers <- c(1, 2, 3, 4, 5)
squared_numbers <- numbers^2
print(squared_numbers)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
[1]  1  4  9 16 25
 	     \`\`\`End

 	     \`\`\`Para
In this case, the operation numbers^2 is applied to the entire vector at once, which is more efficient than using a loop.
 	     \`\`\`End

 	     \`\`\`Para
However, loops may still be necessary in some situations, especially when the operation is more complex or when the task is not easily vectorized.
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Loops in R:
 	     \`\`\`End

 	     \`\`\`Para
for loop: Iterates over a sequence and executes code for each element.
 	     \`\`\`End

 	     \`\`\`Para
while loop: Executes code as long as the given condition is TRUE.
 	     \`\`\`End

 	     \`\`\`Para
repeat loop: Repeats code indefinitely until a break statement is encountered.
 	     \`\`\`End

 	     \`\`\`Para
break: Exits the loop immediately.
 	     \`\`\`End

 	     \`\`\`Para
next: Skips the current iteration and moves to the next one.
 	     \`\`\`End

    `
    },
 {
        id: 9,
        title: "Functions in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Para
Functions in R are blocks of code that can be reused to perform a specific task or computation. Functions are defined by the function() keyword and can take inputs, perform operations, and return outputs. Using functions makes code more modular, readable, and reusable.
 	     \`\`\`End

 	     \`\`\`Bold
1. Defining Functions in R
 	     \`\`\`End

 	     \`\`\`Para
To define a function in R, you use the function() keyword, followed by the argument(s) the function will take, and the block of code to execute.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
function_name <- function(arg1, arg2, ...) {
  # Code to execute
  # Return value
}
 	     \`\`\`End

 	     \`\`\`Para
function_name: The name you want to assign to the function.
 	     \`\`\`End

 	     \`\`\`Para
arg1, arg2, ...: Arguments that the function will accept. You can have zero or more arguments.
 	     \`\`\`End

 	     \`\`\`Para
The function will return a result using the return() statement, though it is not mandatory. If no return() is specified, R will return the last evaluated expression.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Define a simple function
add_numbers <- function(a, b) {
  result <- a + b
  return(result)
}

# Call the function
add_numbers(3, 4)  # Output: 7
 	     \`\`\`End

 	     \`\`\`Bold
Explanation:
 	     \`\`\`End

 	     \`\`\`Para
The function add_numbers takes two arguments a and b.
 	     \`\`\`End

 	     \`\`\`Para
It adds them together and returns the result.
 	     \`\`\`End

 	     \`\`\`Bold
2. Function Without Arguments
 	     \`\`\`End

 	     \`\`\`Para
You can also define functions that don’t take any arguments. These functions simply perform an action when called.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
greet <- function() {
  print("Hello, World!")
}

greet()  # Output: "Hello, World!"
 	     \`\`\`End

 	     \`\`\`Bold
Explanation:
 	     \`\`\`End

 	     \`\`\`Para
The function greet() does not take any input parameters and just prints a message when called.
 	     \`\`\`End

 	     \`\`\`Bold
3. Returning Values from Functions
 	     \`\`\`End

 	     \`\`\`Para
In R, you can return any type of object from a function: vectors, data frames, lists, or even other functions.
 	     \`\`\`End

 	     \`\`\`Bold
Example (returning a vector):
 	     \`\`\`End

 	     \`\`\`Code
create_vector <- function(n) {
  vec <- seq(1, n)
  return(vec)
}

create_vector(5)  # Output: 1 2 3 4 5
 	     \`\`\`End

 	     \`\`\`Para
In this case, the function returns a vector that starts from 1 and ends at n.
 	     \`\`\`End

 	     \`\`\`Bold
4. Default Arguments
 	     \`\`\`End

 	     \`\`\`Para
You can assign default values to function arguments. If the caller doesn’t provide a value for those arguments, the default will be used.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
function_name <- function(arg1 = default_value, arg2 = default_value) {
  # Code to execute
}
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
multiply <- function(a, b = 2) {
  return(a * b)
}

multiply(3)    # Output: 6 (b defaults to 2)
multiply(3, 4) # Output: 12
 	     \`\`\`End

 	     \`\`\`Para
In this example, if only one argument (a) is provided, b defaults to 2. If both arguments are provided, the default is overridden.
 	     \`\`\`End

 	     \`\`\`Bold
5. Anonymous Functions
 	     \`\`\`End

 	     \`\`\`Para
In R, you can also define functions without naming them, commonly referred to as anonymous functions. These are useful when a function is used only once or for a specific operation, like in apply() functions or other functions that accept a function as an argument.
 	     \`\`\`End

 	     \`\`\`Bold
Example (using an anonymous function with lapply):
 	     \`\`\`End

 	     \`\`\`Code
# Using an anonymous function with lapply to square each number in a vector
numbers <- c(1, 2, 3, 4)
squared_numbers <- lapply(numbers, function(x) x^2)
print(squared_numbers)  # Output: list(1, 4, 9, 16)
 	     \`\`\`End

 	     \`\`\`Para
Here, an anonymous function is used inside lapply to square each element of the vector.
 	     \`\`\`End

 	     \`\`\`Bold
6. Nested Functions
 	     \`\`\`End

 	     \`\`\`Para
You can define functions inside other functions. These are called nested functions. The inner function can only be used inside the outer function.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
outer_function <- function(x) {
  inner_function <- function(y) {
    return(y * 2)
  }
  result <- inner_function(x)
  return(result)
}

outer_function(3)  # Output: 6
 	     \`\`\`End

 	     \`\`\`Para
Here, inner_function is defined inside outer_function and can only be called within it. When outer_function(3) is called, it passes x to inner_function, which multiplies x by 2 and returns the result.
 	     \`\`\`End

 	     \`\`\`Bold
7. Function Scoping in R
 	     \`\`\`End

 	     \`\`\`Para
R has lexical scoping, which means that a function can access variables from its parent environment (i.e., the environment in which the function was defined), but it cannot access variables from the global environment unless they are passed as arguments.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
x <- 5
multiply_by_x <- function(y) {
  return(x * y)  # x is from the global environment
}

multiply_by_x(10)  # Output: 50
 	     \`\`\`End

 	     \`\`\`Para
In this case, x is defined outside the function, but it is accessible inside the function because of lexical scoping.
 	     \`\`\`End

 	     \`\`\`Bold
8. The ... Argument
 	     \`\`\`End

 	     \`\`\`Para
In R, the ... (ellipsis) argument allows you to pass a variable number of arguments to a function. This is useful when you don’t know ahead of time how many arguments a function will receive.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
sum_all <- function(...) {
  sum <- sum(c(...))  # Sum all values passed as arguments
  return(sum)
}

sum_all(1, 2, 3, 4, 5)  # Output: 15
 	     \`\`\`End

 	     \`\`\`Para
The ... argument allows the function sum_all to accept any number of arguments, which it then combines into a vector and sums.
 	     \`\`\`End

 	     \`\`\`Bold
9. Anonymous Functions in apply Family
 	     \`\`\`End

 	     \`\`\`Para
The apply, lapply, sapply, and other similar functions in R allow you to apply a function to elements of an object like vectors, matrices, or data frames. Often, an anonymous function is used for these types of operations.
 	     \`\`\`End

 	     \`\`\`Bold
Example using sapply with an anonymous function:
 	     \`\`\`End

 	     \`\`\`Code
numbers <- c(1, 2, 3, 4)
squared <- sapply(numbers, function(x) x^2)
print(squared)  # Output: 1 4 9 16
 	     \`\`\`End

 	     \`\`\`Para
In this case, sapply applies the anonymous function to each element of the numbers vector, squaring each element.
 	     \`\`\`End

 	     \`\`\`Bold
10. Error Handling in Functions
 	     \`\`\`End

 	     \`\`\`Para
R allows you to handle errors inside functions using tryCatch(). This is useful for dealing with potential errors in function execution, such as dividing by zero.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
safe_divide <- function(a, b) {
  result <- tryCatch({
    a / b
  }, error = function(e) {
    return("Error: Division by zero is not allowed!")
  })
  return(result)
}

safe_divide(10, 2)   # Output: 5
safe_divide(10, 0)   # Output: "Error: Division by zero is not allowed!"
 	     \`\`\`End

 	     \`\`\`Para
In this example, tryCatch() catches the error if division by zero occurs and returns a custom error message.
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Functions in R:
 	     \`\`\`End

 	     \`\`\`Para
Defining Functions: Functions are defined using the function() keyword and can take arguments, perform computations, and return results.
 	     \`\`\`End

 	     \`\`\`Para
Arguments: Functions can have default arguments and can take a variable number of arguments using ....
 	     \`\`\`End

 	     \`\`\`Para
Returning Values: Functions return values using the return() statement, though it is not always required.
 	     \`\`\`End

 	     \`\`\`Para
Anonymous Functions: Functions can be defined without names, typically used in situations like applying a function to a vector.
 	     \`\`\`End

 	     \`\`\`Para
Nested Functions: Functions can be defined inside other functions, with the inner function only accessible to the outer function.
 	     \`\`\`End

 	     \`\`\`Para
Error Handling: You can handle errors in functions using tryCatch().
 	     \`\`\`End

 	     \`\`\`Para
Scoping: Functions have access to variables in their parent environment due to lexical scoping.
 	     \`\`\`End

 	     \`\`\`Para
Functions in R are a powerful tool for making your code more modular, reusable, and organized. They are essential for performing repetitive tasks efficiently and handling complex operations.
 	     \`\`\`End
    `
    },
 {
        id: 10,
        title: "R Max and Min",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
max() and min() Functions in R
 	     \`\`\`End

 	     \`\`\`Para
In R, the max() and min() functions are used to find the maximum and minimum values in a vector, data frame, or other data structures. These functions are very useful for determining the largest and smallest values in a dataset.
 	     \`\`\`End

 	     \`\`\`Bold
1. max() Function
 	     \`\`\`End

 	     \`\`\`Para
The max() function returns the largest value in a vector, list, or array. You can also pass multiple vectors as arguments, and max() will return the maximum value across them.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
max(..., na.rm = FALSE)
 	     \`\`\`End

 	     \`\`\`Para
...: One or more R objects (vectors, data frames, etc.) to find the maximum of.
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Logical value indicating whether NA values should be removed before computation. The default is FALSE, meaning if there are any NA values, the function will return NA. Set na.rm = TRUE to ignore NA values.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Find the maximum value in a vector
numbers <- c(3, 7, 2, 8, 5)
max_value <- max(numbers)
print(max_value)  # Output: 8
 	     \`\`\`End

 	     \`\`\`Bold
Example with na.rm = TRUE:
 	     \`\`\`End

 	     \`\`\`Code
# Handle NA values
numbers_with_na <- c(3, 7, NA, 8, 5)
max_value_na <- max(numbers_with_na, na.rm = TRUE)
print(max_value_na)  # Output: 8
 	     \`\`\`End

 	     \`\`\`Para
Here, max() returns 8 because it is the largest number in the vector, and the NA is ignored when na.rm = TRUE.
 	     \`\`\`End

 	     \`\`\`Bold
2. min() Function
 	     \`\`\`End

 	     \`\`\`Para
The min() function returns the smallest value in a vector, list, or array. Like max(), it can also handle multiple arguments and has an na.rm argument to remove NA values.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
min(..., na.rm = FALSE)
 	     \`\`\`End

 	     \`\`\`Para
...: One or more R objects (vectors, data frames, etc.) to find the minimum of.
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Logical value indicating whether NA values should be removed before computation. The default is FALSE.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Find the minimum value in a vector
numbers <- c(3, 7, 2, 8, 5)
min_value <- min(numbers)
print(min_value)  # Output: 2
 	     \`\`\`End

 	     \`\`\`Bold
Example with na.rm = TRUE:
 	     \`\`\`End

 	     \`\`\`Code
# Handle NA values
numbers_with_na <- c(3, 7, NA, 8, 5)
min_value_na <- min(numbers_with_na, na.rm = TRUE)
print(min_value_na)  # Output: 3
 	     \`\`\`End

 	     \`\`\`Para
In this case, the minimum value is 3, and NA is ignored when na.rm = TRUE.
 	     \`\`\`End

 	     \`\`\`Bold
3. max() and min() with Multiple Arguments
 	     \`\`\`End

 	     \`\`\`Para
Both max() and min() can be used to find the maximum or minimum across multiple vectors or data frames.
 	     \`\`\`End

 	     \`\`\`Bold
Example with multiple vectors:
 	     \`\`\`End

 	     \`\`\`Code
vector1 <- c(1, 4, 9)
vector2 <- c(3, 5, 2)
max_value_multiple <- max(vector1, vector2)
print(max_value_multiple)  # Output: 9
 	     \`\`\`End

 	     \`\`\`Para
Here, the maximum value is 9, which is the largest value when both vectors are considered together.
 	     \`\`\`End

 	     \`\`\`Bold
4. Using max() and min() with Data Frames
 	     \`\`\`End

 	     \`\`\`Para
If you have a data frame, the max() and min() functions will return the maximum and minimum values for the entire data frame, considering all columns and rows.
 	     \`\`\`End

 	     \`\`\`Bold
Example with a Data Frame:
 	     \`\`\`End

 	     \`\`\`Code
# Create a data frame
data <- data.frame(
  A = c(3, 7, 5),
  B = c(6, 8, 2),
  C = c(1, 4, 9)
)

max_value_df <- max(data)  # Will find max across all columns
print(max_value_df)  # Output: 9
 	     \`\`\`End

 	     \`\`\`Para
The max() function returns 9, as it is the highest value across all columns of the data frame.
 	     \`\`\`End

 	     \`\`\`Bold
Finding the max in each column:
 	     \`\`\`End

 	     \`\`\`Para
You can apply max() to each column individually using apply():
 	     \`\`\`End

 	     \`\`\`Code
column_max <- apply(data, 2, max)  # Apply max to each column (margin = 2)
print(column_max)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
 A B C
 7 8 9
 	     \`\`\`End

 	     \`\`\`Para
Here, apply() calculates the maximum value for each column in the data frame.
 	     \`\`\`End

 	     \`\`\`Bold
5. max() and min() for Matrices
 	     \`\`\`End

 	     \`\`\`Para
You can also use max() and min() on matrices. These functions will return the maximum or minimum value from the entire matrix, or you can apply them to rows or columns.
 	     \`\`\`End

 	     \`\`\`Bold
Example with a Matrix:
 	     \`\`\`End

 	     \`\`\`Code
matrix_data <- matrix(c(1, 4, 7, 2, 5, 8, 3, 6, 9), nrow = 3, byrow = TRUE)

max_value_matrix <- max(matrix_data)  # Find the max value in the matrix
print(max_value_matrix)  # Output: 9
 	     \`\`\`End

 	     \`\`\`Bold
Finding max values for each row or column:
 	     \`\`\`End

 	     \`\`\`Code
# Max value for each row
max_rows <- apply(matrix_data, 1, max)
print(max_rows)  # Output: 7 8 9

# Max value for each column
max_columns <- apply(matrix_data, 2, max)
print(max_columns)  # Output: 3 6 9
 	     \`\`\`End

 	     \`\`\`Bold
Summary of max() and min() Functions:
 	     \`\`\`End

 	     \`\`\`Para
max(): Finds the maximum value in a vector, list, or data structure.
 	     \`\`\`End

 	     \`\`\`Para
min(): Finds the minimum value in a vector, list, or data structure.
 	     \`\`\`End

 	     \`\`\`Para
Handling NA values: Use na.rm = TRUE to ignore NA values when calculating the max or min.
 	     \`\`\`End

 	     \`\`\`Para
Multiple arguments: You can pass multiple vectors to max() or min() to find the maximum or minimum across them.
 	     \`\`\`End

 	     \`\`\`Para
Data Frames and Matrices: You can apply max() or min() to data frames and matrices to find the maximum or minimum value across rows or columns.
 	     \`\`\`End

 	     \`\`\`Para
These functions are commonly used for summarizing data and performing quick checks on the range of values in a dataset.
 	     \`\`\`End
    `
    },
 {
        id: 11,
        title: "Mean, Median, and Mode in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Mean, Median, and Mode in R
 	     \`\`\`End

 	     \`\`\`Para
In statistics, the mean, median, and mode are measures of central tendency. They help summarize the distribution of values in a dataset. In R, you can compute these measures using built-in functions.
 	     \`\`\`End

 	     \`\`\`Bold
1. Mean in R
 	     \`\`\`End

 	     \`\`\`Para
The mean is the average of a set of numbers. It is calculated by summing all the values and dividing by the number of values.
 	     \`\`\`End

 	     \`\`\`Para
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
mean(x, trim = 0, na.rm = FALSE)
 	     \`\`\`End

 	     \`\`\`Para
x: A numeric vector or data frame column.
 	     \`\`\`End

 	     \`\`\`Para
trim: A fraction of the values to be trimmed from both ends before calculating the mean (default is 0, meaning no trimming).
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Logical value indicating whether to remove NA values before computing the mean (default is FALSE).
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Find the mean of a vector
numbers <- c(1, 2, 3, 4, 5)
mean_value <- mean(numbers)
print(mean_value)  # Output: 3
 	     \`\`\`End

 	     \`\`\`Bold
Example with na.rm = TRUE:
 	     \`\`\`End

 	     \`\`\`Code
numbers_with_na <- c(1, 2, NA, 4, 5)
mean_value_na <- mean(numbers_with_na, na.rm = TRUE)
print(mean_value_na)  # Output: 3
 	     \`\`\`End

 	     \`\`\`Para
In this example, NA is ignored because na.rm = TRUE.
 	     \`\`\`End

 	     \`\`\`Bold
2. Median in R
 	     \`\`\`End

 	     \`\`\`Para
The median is the middle value when the data is sorted in ascending order. If the number of observations is even, the median is the average of the two middle numbers.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
median(x, na.rm = FALSE)
 	     \`\`\`End

 	     \`\`\`Para
x: A numeric vector or data frame column.
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Logical value indicating whether to remove NA values before computing the median (default is FALSE).
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Find the median of a vector
numbers <- c(1, 2, 3, 4, 5)
median_value <- median(numbers)
print(median_value)  # Output: 3
 	     \`\`\`End

 	     \`\`\`Bold
Example with an even number of values:
 	     \`\`\`End

 	     \`\`\`Code
numbers_even <- c(1, 2, 3, 4)
median_value_even <- median(numbers_even)
print(median_value_even)  # Output: 2.5
 	     \`\`\`End

 	     \`\`\`Para
In this example, the median is the average of 2 and 3, which is 2.5.
 	     \`\`\`End

 	     \`\`\`Bold
Example with na.rm = TRUE:
 	     \`\`\`End

 	     \`\`\`Code
numbers_with_na <- c(1, 2, NA, 4, 5)
median_value_na <- median(numbers_with_na, na.rm = TRUE)
print(median_value_na)  # Output: 3
 	     \`\`\`End

 	     \`\`\`Bold
3. Mode in R
 	     \`\`\`End

 	     \`\`\`Para
The mode is the value that appears most frequently in a dataset. Unlike the mean and median, R doesn't have a built-in function for calculating the mode directly, but you can create a function to compute it.
 	     \`\`\`End

 	     \`\`\`Bold
Custom Function to Calculate Mode:
 	     \`\`\`End

 	     \`\`\`Code
get_mode <- function(x) {
  uniq_x <- unique(x)  # Get unique values
  uniq_x[which.max(tabulate(match(x, uniq_x)))]  # Return the most frequent value
}
 	     \`\`\`End

 	     \`\`\`Para
unique(x): Returns the unique elements in the vector x.
 	     \`\`\`End

 	     \`\`\`Para
match(x, uniq_x): Finds the positions of x in uniq_x.
 	     \`\`\`End

 	     \`\`\`Para
tabulate(): Counts the occurrences of each value.
 	     \`\`\`End

  	     \`\`\`Para
which.max(): Returns the index of the maximum value (i.e., the mode).
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Find the mode of a vector
numbers <- c(1, 2, 2, 3, 4)
mode_value <- get_mode(numbers)
print(mode_value)  # Output: 2
 	     \`\`\`End

 	     \`\`\`Para
If there is more than one mode (i.e., multiple values appear with the highest frequency), the function will return the first mode encountered.
 	     \`\`\`End

 	     \`\`\`Bold
Example with multiple modes:
 	     \`\`\`End

 	     \`\`\`Code
numbers_multiple_modes <- c(1, 2, 2, 3, 3, 4)
mode_value_multiple <- get_mode(numbers_multiple_modes)
print(mode_value_multiple)  # Output: 2
 	     \`\`\`End

 	     \`\`\`Para
In this example, both 2 and 3 are modes, but the function will return the first mode, which is 2.
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Mean, Median, and Mode in R:
 	     \`\`\`End

 	     \`\`\`Para
Mean (mean()): The arithmetic average of a set of values. It is sensitive to outliers.
 	     \`\`\`End

 	     \`\`\`Para
Median (median()): The middle value of a set of values when they are sorted. It is more robust to outliers than the mean.
 	     \`\`\`End

 	     \`\`\`Para
Mode: The most frequent value in a dataset. There is no built-in function in R for mode, but a custom function can be created.
 	     \`\`\`End

 	     \`\`\`Para
These three measures are fundamental for summarizing data and understanding its distribution. The mean is useful for symmetric data, the median is preferred for skewed distributions, and the mode is important for categorical data or identifying common values.
 	     \`\`\`End
    `
    },
 {
        id: 12,
        title: "Percentile in R",
        hasAssessment: true,
        content: `
 	     \`\`\`Bold
Percentile in R
 	     \`\`\`End

 	     \`\`\`Para
In statistics, percentiles are used to understand the distribution of data by dividing it into 100 equal parts. For example, the 50th percentile is the median, the 25th percentile is the first quartile (Q1), and the 75th percentile is the third quartile (Q3).
 	     \`\`\`End

 	     \`\`\`Para
R provides functions to calculate percentiles using the quantile() function.
 	     \`\`\`End

 	     \`\`\`Bold
1. quantile() Function
 	     \`\`\`End

 	     \`\`\`Para
The quantile() function in R is used to compute percentiles, such as the 25th, 50th, and 75th percentiles, or any other specific percentile you wish to calculate.
 	     \`\`\`End

 	     \`\`\`Bold
Syntax:
 	     \`\`\`End

 	     \`\`\`Code
quantile(x, probs = c(0, 0.25, 0.5, 0.75, 1), na.rm = FALSE, names = TRUE, type = 7)
 	     \`\`\`End

 	     \`\`\`Para
x: A numeric vector, data frame, or matrix of values.
 	     \`\`\`End

 	     \`\`\`Para
probs: A numeric vector of probabilities, where each value represents the percentile to be calculated. For example, 0.25 represents the 25th percentile, 0.5 represents the 50th percentile (median), and 0.75 represents the 75th percentile.
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Logical value indicating whether NA values should be removed before computation (default is FALSE).
 	     \`\`\`End

 	     \`\`\`Para
names: Logical value indicating whether to return names for the computed quantiles (default is TRUE).
 	     \`\`\`End

 	     \`\`\`Para
type: Specifies the algorithm used to calculate the quantile (default is 7).
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Calculate percentiles of a vector
data <- c(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

# 25th, 50th (median), and 75th percentiles
percentiles <- quantile(data, probs = c(0.25, 0.5, 0.75))
print(percentiles)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
  25%   50%   75% 
  32.5  55.0  77.5 
 	     \`\`\`End

 	     \`\`\`Bold
In this example:
 	     \`\`\`End


 	     \`\`\`Para
The 25th percentile (Q1) is 32.5
 	     \`\`\`End

 	     \`\`\`Para
The 50th percentile (median) is 55.0
 	     \`\`\`End

 	     \`\`\`Para
The 75th percentile (Q3) is 77.5
 	     \`\`\`End

 	     \`\`\`Bold
2. Finding a Specific Percentile
 	     \`\`\`End

 	     \`\`\`Para
You can calculate any specific percentile by adjusting the probs argument in the quantile() function.
 	     \`\`\`End

 	     \`\`\`Bold
Example (finding the 90th percentile):
 	     \`\`\`End

 	     \`\`\`Code
# Calculate the 90th percentile
percentile_90 <- quantile(data, probs = 0.90)
print(percentile_90)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
 90% 
  90 
The 90th percentile is 90.
 	     \`\`\`End

 	     \`\`\`Bold
3. Handling NA Values
 	     \`\`\`End

 	     \`\`\`Para
If your dataset contains NA values, you can remove them by setting na.rm = TRUE.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Vector with NA values
data_with_na <- c(10, 20, 30, NA, 50, 60, 70)

# Calculate percentiles while removing NA values
percentiles_na <- quantile(data_with_na, probs = c(0.25, 0.5, 0.75), na.rm = TRUE)
print(percentiles_na)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
  25%   50%   75% 
  32.5  45.0  65.0 
 	     \`\`\`End

 	     \`\`\`Para
By using na.rm = TRUE, the NA values are ignored, and the percentiles are calculated from the remaining values.
 	     \`\`\`End

 	     \`\`\`Bold
4. Using quantile() with Data Frames
 	     \`\`\`End

 	     \`\`\`Para
If you have a data frame and want to calculate the percentiles of each column, you can use the quantile() function along with apply().
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Create a data frame
df <- data.frame(
  A = c(10, 20, 30, 40, 50),
  B = c(5, 15, 25, 35, 45),
  C = c(7, 14, 21, 28, 35)
)

# Calculate the 25th, 50th, and 75th percentiles for each column
percentiles_df <- apply(df, 2, quantile, probs = c(0.25, 0.5, 0.75))
print(percentiles_df)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
       A   B   C
25%  20.0 10.0 11.0
50%  30.0 20.0 21.0
75%  40.0 30.0 28.0
 	     \`\`\`End

 	     \`\`\`Para
In this example, apply() applies the quantile() function to each column of the data frame, and calculates the 25th, 50th, and 75th percentiles for each column.
 	     \`\`\`End

 	     \`\`\`Bold
5. Percentile Calculation for Matrices
 	     \`\`\`End

 	     \`\`\`Para
The quantile() function also works for matrices. It calculates the percentiles across the entire matrix, considering all values.
 	     \`\`\`End

 	     \`\`\`Bold
Example:
 	     \`\`\`End

 	     \`\`\`Code
# Create a matrix
matrix_data <- matrix(c(10, 20, 30, 40, 50, 60, 70, 80, 90, 100), nrow = 5)

# Calculate percentiles for the matrix
percentiles_matrix <- quantile(matrix_data, probs = c(0.25, 0.5, 0.75))
print(percentiles_matrix)
 	     \`\`\`End

 	     \`\`\`Bold
Output:
 	     \`\`\`End

 	     \`\`\`Code
  25%   50%   75% 
  32.5  55.0  77.5 
 	     \`\`\`End

 	     \`\`\`Para
This example computes the 25th, 50th, and 75th percentiles for all values in the matrix.
 	     \`\`\`End

 	     \`\`\`Bold
Summary of Percentile Calculation in R:
 	     \`\`\`End

 	     \`\`\`Para
quantile() is the main function used to calculate percentiles in R.
 	     \`\`\`End

 	     \`\`\`Para
probs: Specifies the percentiles you want to calculate (e.g., 0.25 for 25th percentile, 0.5 for 50th percentile).
 	     \`\`\`End

 	     \`\`\`Para
na.rm: Set to TRUE to remove NA values when calculating percentiles.
 	     \`\`\`End

 	     \`\`\`Para
Data Structures: The quantile() function can be applied to vectors, data frames, and matrices to compute percentiles across rows or columns.
 	     \`\`\`End

 	     \`\`\`Para
Percentiles are essential for understanding the distribution and spread of data, especially in terms of quartiles (Q1, median, and Q3), and can be used in various statistical analyses and data visualization tasks.
 	     \`\`\`End
    `
    },
]

export default rlessons;