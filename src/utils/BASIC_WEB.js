const lessonsWeb = [
{
 title: "Introduction to HTML",
 id: 0,
 content: `
 \`\`\`Para
	HTML, or HyperText Markup Language, is the standard language used to create and design web pages. It provides the basic structure of a website, which is enhanced and modified by other technologies like CSS (Cascading Style Sheets) and JavaScript.
\`\`\`End

\`\`\`Para
	HTML, or HyperText Markup Language, is the standard language used to create and design web pages. It provides the basic structure of a website, which is enhanced and modified by other technologies like CSS (Cascading Style Sheets) and JavaScript.
\`\`\`End

\`\`\`Bold
	Key Concepts:
\`\`\`End

\`\`\`Para
	Elements and Tags: HTML is made up of elements, which are represented by tags. Tags are written using angle brackets. For example, <p> is a tag for a paragraph.
\`\`\`End

\`\`\`Para
	Attributes: HTML elements can have attributes that provide additional information about an element. Attributes are always specified in the opening tag. For example, <a href="https://www.example.com">Link</a> has an href attribute that specifies the URL of the link.
\`\`\`End

\`\`\`Bold
Structure: A basic HTML document has a specific structure:
\`\`\`End

\`\`\`Para
<!DOCTYPE html>: Declares the document type.
\`\`\`End

\`\`\`Para
<!DOCTYPE html>: Declares the document type.
\`\`\`End

\`\`\`Para
<html>: The root element of an HTML page.
\`\`\`End

\`\`\`Para
<head>: Contains meta-information, links to CSS, and title.
\`\`\`End

\`\`\`Para
<body>: Contains the content that is displayed on the web page.
\`\`\`End

\`\`\`Bold
Example of a Simple HTML Document
\`\`\`End

\`\`\`Code
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page. I’m learning how to create web pages!</p>
    <a href="https://www.example.com">Visit Example</a>
</body>
</html>
\`\`\`End

\`\`\`Bold
	Explanation of the Example:
\`\`\`End

\`\`\`Para
	<!DOCTYPE html>: Indicates the document is an HTML5 document.
\`\`\`End

\`\`\`Para
	<html lang="en">: Begins the HTML document and specifies that the language is English.
\`\`\`End

\`\`\`Para
	<head>: Contains metadata, including character set and viewport settings for responsive design.
\`\`\`End

\`\`\`Para
	<title>: Sets the title of the web page, which appears in the browser tab.
\`\`\`End

\`\`\`Para
	<body>: Contains the main content of the page.
\`\`\`End

\`\`\`Para
	<h1>: A top-level heading.
\`\`\`End

\`\`\`Para
	<a>: A hyperlink to another website.
\`\`\`End

\`\`\`Para
	This basic structure is the foundation for building more complex web pages as you continue to learn HTML and integrate it with CSS and JavaScript.
\`\`\`End
`
},
{
 title: "HTML Elements",
 content: `
\`\`\`Para
HTML (Hypertext Markup Language) is the standard language used to create web pages. It consists of various elements, which are the building blocks of web content. Each element typically includes a start tag, content, and an end tag. Here’s an overview of some common HTML elements:
\`\`\`End

\`\`\`Bold
Common HTML Elements
\`\`\`End

\`\`\`Para
Headings: Used to define headings, ranging from <h1> (most important) to <h6> (least important).
\`\`\`Para

\`\`\`Code
<h1>This is a Heading 1</h1>
<h2>This is a Heading 2</h2>
\`\`\`End

\`\`\`Para
Paragraphs: The <p> element defines a paragraph.
\`\`\`End

\`\`\`Code
<p>This is a paragraph of text.</p>
\`\`\`End

\`\`\`Para
Links: The <a> element is used to create hyperlinks.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com">Visit Example</a>
\`\`\`End

\`\`\`Para
Images: The <img> element is used to embed images.
\`\`\`End

\`\`\`Code
<img src="image.jpg" alt="Description of the image">
\`\`\`End

\`\`\`Para
Lists: You can create ordered (<ol>) and unordered lists (<ul>).
\`\`\`End

\`\`\`Code
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
\`\`\`End

\`\`\`Para
Divisions: The <div> element is a block-level container often used for layout purposes.
\`\`\`Para

\`\`\`Code
<div>
    <p>This is inside a div.</p>
</div>
\`\`\`End

\`\`\`Para
Forms: The <form> element is used to create interactive forms.
\`\`\`End

\`\`\`Code
<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <input type="submit" value="Submit">
</form>
\`\`\`End

\`\`\`Bold
Example of a Simple HTML Document Using Several Elements
\`\`\`End

\`\`\`Code
several elements
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple HTML Example</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a paragraph of text introducing the site.</p>
    <h2>About Us</h2>
    <p>We are a company that specializes in web development.</p>
    <h2>Contact</h2>
    <p>If you have any questions, <a href="mailto:info@example.com">email us</a>.</p>
    <h2>Our Services</h2>
    <ul>
        <li>Web Design</li>
        <li>SEO Services</li>
        <li>Content Creation</li>
    </ul>
    <h2>Submit Your Inquiry</h2>
    <form action="/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <input type="submit" value="Submit">
    </form>
</body>
</html>
\`\`\`End
`
},
{
 title: "HTML Attributes",
 content: `
\`\`\`Para
HTML attributes provide additional information about HTML elements. They are always specified in the opening tag and usually come in name/value pairs, like name="value". Here are some common attributes:
\`\`\`End

\`\`\`Bold
Common HTML Attributes
\`\`\`End

\`\`\`Para
href: Used in anchor (<a>) tags to specify the URL of the link.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com">Visit Example</a>
\`\`\`End

\`\`\`Para
src: Used in image (<img>) tags to specify the path to the image.
\`\`\`End

\`\`\`Code
<img src="image.jpg" alt="Description of the image">
\`\`\`End

\`\`\`Para
alt: Provides alternative text for images, useful for accessibility.
\`\`\`End

\`\`\`Code
<img src="image.jpg" alt="A beautiful scenery">
\`\`\`End

\`\`\`Para
id: Assigns a unique identifier to an element, which can be used for styling or scripting.
\`\`\`End

\`\`\`Code
<div id="header">This is the header</div>
\`\`\`End

\`\`\`Para
class: Assigns one or more class names to an element, which can be used for styling with CSS.
\`\`\`End

\`\`\`Code
<p class="highlight">This paragraph is highlighted.</p>
\`\`\`End

\`\`\`Para
style: Allows inline CSS styles to be applied to an element.
\`\`\`End


\`\`\`Code
<h1 style="color: blue;">This heading is blue.</h1>
\`\`\`End

\`\`\`Para
placeholder: Used in form elements to provide a hint to the user about what to enter.
\`\`\`End

\`\`\`Code
<input type="text" placeholder="Enter your name">
\`\`\`End

\`\`\`Para
value: Specifies the initial value of form elements like input fields.
\`\`\`End

\`\`\`Code
<input type="submit" value="Submit">
\`\`\`End

\`\`\`Bold
Example of HTML That Incorporates Various Attributes
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Attributes Example</title>
</head>
<body>
    <h1 id="main-title" class="header">Welcome to My Website</h1>
    <p class="intro" style="font-size: 18px;">This is a simple example demonstrating HTML attributes.</p>
    <a href="https://www.example.com" target="_blank">Visit Example</a>
    <img src="image.jpg" alt="A beautiful scenery" width="300">
    <form action="/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name">
        <input type="submit" value="Submit">
    </form>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of Attributes Used
\`\`\`End

\`\`\`Para
id="main-title": Uniquely identifies the heading.
\`\`\`End

\`\`\`Para
class="header": Allows CSS styling to be applied to all elements with the class "header."
\`\`\`End

\`\`\`Para
style="font-size: 18px;": Applies inline CSS to change the font size of the paragraph.
\`\`\`End

\`\`\`Para
href="https://www.example.com": Specifies the URL the link points to.
\`\`\`End

\`\`\`Para
target="_blank": Opens the link in a new tab.
\`\`\`End

\`\`\`Para
alt="A beautiful scenery": Provides alternative text for the image.
\`\`\`End

\`\`\`Para
placeholder="Enter your name": Shows a hint in the text input field.
\`\`\`End

\`\`\`Para
Attributes enhance the functionality and accessibility of HTML elements, making them essential for web development.
\`\`\`End
`
},
{
 title: "HTML Heading",
 content: `
\`\`\`End
HTML headings are used to define the structure and hierarchy of content on a web page. They range from <h1> to <h6>, with <h1> being the highest level (most important) and <h6> the lowest. Proper use of headings improves readability, SEO, and accessibility.
\`\`\`End

\`\`\`Bold
Importance of HTML Headings
\`\`\`End

\`\`\`Para
Hierarchy: They create a logical structure, allowing users and search engines to understand the organization of content.
\`\`\`End

\`\`\`Para
SEO: Search engines use headings to determine the relevance of content to search queries.
\`\`\`End

\`\`\`Para
Accessibility: Screen readers use headings to help visually impaired users navigate through the content.
\`\`\`End

\`\`\`Bold
HTML Heading Elements
\`\`\`End

\`\`\`Para
<h1>: Main heading of the document (usually only one per page).
\`\`\`End

\`\`\`Para
<h2>: Subheading that breaks down the content of <h1>.
\`\`\`End

\`\`\`Para
<h3>: Further subheading under <h2>.
\`\`\`End

\`\`\`Para
<h4>: Subheading under <h3>.
\`\`\`End

\`\`\`Para
<h5>: Subheading under <h4>.
\`\`\`End

\`\`\`Para
<h6>: The least important heading.
\`\`\`End

\`\`\`Bold
Example of HTML Headings
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Headings Example</title>
</head>
<body>
    <h1>My Favorite Hobbies</h1>
    <h2>Outdoor Activities</h2>
    <p>I enjoy hiking, biking, and camping.</p>
    <h3>Hiking</h3>
    <p>Hiking allows me to explore nature and stay fit.</p>
    <h3>Biking</h3>
    <p>Biking is a great way to enjoy the outdoors and improve my stamina.</p>
    <h2>Creative Hobbies</h2>
    <p>I also love painting and writing.</p>
    <h3>Painting</h3>
    <p>Painting helps me express my creativity.</p>
    <h3>Writing</h3>
    <p>Writing allows me to share my thoughts and stories.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
<h1>: The main title "My Favorite Hobbies" indicates the primary topic of the page.
\`\`\`End

\`\`\`Para
<h2>: "Outdoor Activities" and "Creative Hobbies" are major sections that break down the main topic.
\`\`\`End

\`\`\`Para
<h3>: Subtopics like "Hiking," "Biking," "Painting," and "Writing" provide further detail under each section.
\`\`\`End

\`\`\`Para
Using headings effectively not only helps with organization but also enhances user experience and search engine visibility.
\`\`\`End
`
},
{
title: "HTML Paragraph",
 content: `
\`\`\`Para
HTML paragraphs are used to structure blocks of text on a web page. The <p> element defines a paragraph, and it automatically adds space (margin) above and below the content, making it easier to read.
\`\`\`End

\`\`\`Bold
Importance of HTML Paragraphs
\`\`\`End

\`\`\`Para
Text Organization: Paragraphs help break text into manageable sections, enhancing readability.
\`\`\`End

\`\`\`Para
Semantic Structure: Using paragraphs appropriately gives meaning to the content and aids in SEO and accessibility.
\`\`\`End

\`\`\`Para
Visual Clarity: Properly structured paragraphs improve the visual layout of the text, making it more appealing.
\`\`\`End

\`\`\`Bold
HTML Paragraph Element
\`\`\`End

\`\`\`Para
<p>: The standard element for paragraphs in HTML.
\`\`\`End

\`\`\`Bold
Example of HTML Paragraphs in an HTML Document
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Paragraph Example</title>
</head>
<body>
    <h1>The Importance of Healthy Eating</h1>
    <p>Eating a balanced diet is crucial for maintaining good health. It provides the nutrients your body needs to function effectively.</p>
    
    <p>A healthy diet can help prevent chronic diseases such as heart disease, diabetes, and obesity. By incorporating a variety of foods, you ensure your body gets the vitamins and minerals it requires.</p>
    
    <p>In addition to physical health benefits, eating well can also improve your mental well-being. Studies show that a nutritious diet can positively affect mood and cognitive function.</p>
    
    <p>To maintain a healthy diet, focus on whole foods such as fruits, vegetables, whole grains, lean proteins, and healthy fats. Limiting processed foods and sugars is also important for overall health.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
<h1>: The main heading introduces the topic of the page.
\`\`\`Para
<p>: Each paragraph describes different aspects of healthy eating, making the content clear and organized.
\`\`\`End

\`\`\`Bold
Key Points
\`\`\`End

\`\`\`Para
Each <p> element creates a new paragraph with appropriate spacing, making it easy for readers to distinguish between different ideas.
\`\`\`End

\`\`\`Para
Using multiple paragraphs breaks up the text, preventing it from appearing overwhelming or dense.
\`\`\`End

\`\`\`Para
Overall, the <p> element is essential for creating structured, readable text on web pages. Proper use of paragraphs enhances user experience and helps convey information effectively.
\`\`\`End
`
},
{
title: "HTML Styles",
 content: `
\`\`\`Para
HTML styles control the presentation of HTML elements on a web page. While HTML is primarily used for structuring content, styles are applied using CSS (Cascading Style Sheets) to enhance the visual appearance. You can apply styles in three main ways: inline, internal, and external.
\`\`\`End

\`\`\`Bold
Ways to Apply Styles
\`\`\`End

\`\`\`Para
Inline Styles: Styles are applied directly within an HTML element using the style attribute.
\`\`\`End

\`\`\`Para
<h1 style="color: blue; font-size: 24px;">This is a Heading</h1>
\`\`\`End

\`\`\`Para
Internal Styles: Styles are defined within a <style> element in the <head> section of the HTML document.
\`\`\`End

\`\`\`Code
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        p {
            color: green;
            line-height: 1.5;
        }
    </style>
</head>
External Styles: Styles are defined in an external CSS file linked to the HTML document. This is the most common and recommended method for larger projects.

html
Copy code
<link rel="stylesheet" href="styles.css">
Example of HTML with Styles
Here’s a complete example that demonstrates all three ways of applying styles:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Styles Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: darkblue;
            text-align: center;
        }
        p {
            color: darkgreen;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <h1 style="font-size: 36px;">Welcome to My Website</h1>
    <p>This is an example of a paragraph styled with internal CSS. The color and line height are defined in the style section.</p>
    <p style="font-weight: bold;">This is another paragraph with an inline style, making the text bold.</p>
    <p>This paragraph demonstrates the effects of external styles (if linked) or internal styles applied to all paragraphs.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Internal Styles:
\`\`\`End

\`\`\`Para
The <style> tag in the <head> section defines the overall appearance of the body, h1, and p elements.
\`\`\`End

\`\`\`Para
The body has a background color, and the h1 has a specific color and alignment.
\`\`\`End

\`\`\`Bold
Inline Styles:
\`\`\`End

\`\`\`Para
The first heading (<h1>) has a font size specified directly in the element.
\`\`\`End

\`\`\`Para
The second paragraph uses an inline style to make the text bold.
\`\`\`End

\`\`\`Bold
Benefits of Using CSS Styles
\`\`\`End

\`\`\`Para
Separation of Concerns: Styles are separated from HTML content, making maintenance easier.
\`\`\`End

\`\`\`Para
Reusability: External styles can be reused across multiple HTML files, promoting consistency.
\`\`\`End

\`\`\`Para
Flexibility: Changes can be made in one place (in CSS) rather than in multiple HTML files or elements.
\`\`\`End

\`\`\`Para
Using CSS effectively enhances the design and usability of web pages, making them visually appealing and user-friendly.
\`\`\`End
`
},
{
title: "HTML Formatting",
 content: `
\`\`\`Para
HTML formatting refers to the use of various HTML elements to change the appearance of text and content on a web page. This includes elements that can modify font styles, sizes, colors, and other visual aspects. HTML provides several tags for formatting, allowing for emphasis and structure.
\`\`\`End

\`\`\`Bold
Common HTML Formatting Elements
\`\`\`End

\`\`\`Bold
Bold Text:
\`\`\`End

\`\`\`Para
<strong>: Indicates strong importance, usually rendered as bold.
\`\`\`End

\`\`\`Para
<b>: Simply makes text bold without conveying semantic importance.
\`\`\`End

\`\`\`Code
<strong>This text is important.</strong>
<b>This text is bold.</b>
\`\`\`End

\`\`\`Bold
Italic Text:
\`\`\`End

\`\`\`Para
<em>: Emphasizes text, usually rendered in italics.
\`\`\`End

\`\`\`Para
<i>: Italics without semantic meaning.
\`\`\`End

\`\`\`Code
<em>This text is emphasized.</em>
<i>This text is italicized.</i>
\`\`\`End

\`\`\`Bold
Underlined Text:
\`\`\`End

\`\`\`Para
<u>: Underlines the text.
\`\`\`End

\`\`\`Code
<u>This text is underlined.</u>
\`\`\`End

\`\`\`Bold
Strikethrough Text:
\`\`\`End

\`\`\`Para
<del>: Indicates deleted text, typically rendered with a line through it.
\`\`\`End

\`\`\`Para
<s>: Strikes through text without indicating deletion.
\`\`\`End

\`\`\`Code
<del>This text has been deleted.</del>
<s>This text is struck through.</s>
\`\`\`End

\`\`\`Bold
Subscript and Superscript:
\`\`\`End

\`\`\`Para
<sub>: Displays text as subscript (e.g., H<sub>2</sub>O).
\`\`\`End

\`\`\`Para
<sup>: Displays text as superscript (e.g., x<sup>2</sup>).
\`\`\`End

\`\`\`Code
H<sub>2</sub>O and x<sup>2</sup>
\`\`\`End

\`\`\`Bold
Small Text:
\`\`\`End

\`\`\`Para
<small>: Renders smaller text.
\`\`\`End

\`\`\`Code
<small>This text is smaller.</small>
\`\`\`End

\`\`\`Bold
Marking Text:
\`\`\`End

\`\`\`Para
<mark>: Highlights text.
\`\`\`End

\`\`\`Code
<mark>This text is highlighted.</mark>
\`\`\`End

\`\`\`Bold
Example of HTML Formatting
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Formatting Example</title>
</head>
<body>
    <h1>HTML Formatting Examples</h1>
    
    <h2>Text Formatting</h2>
    <p><strong>This is strong text.</strong> It indicates important content.</p>
    <p><em>This is emphasized text.</em> It usually appears in italics.</p>
    <p>This is <u>underlined text</u> for emphasis.</p>
    <p><del>This text has been deleted.</del> <s>This text is struck through.</s></p>
    
    <h2>Subscript and Superscript</h2>
    <p>Water is represented as H<sub>2</sub>O.</p>
    <p>The square of x is written as x<sup>2</sup>.</p>
    
    <h2>Other Formatting</h2>
    <p><small>This is smaller text.</small></p>
    <p>Highlighting text is done using <mark>this tag</mark>.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Headings: The document uses headings to introduce different sections.
\`\`\`End
\`\`\`Para
Text Formatting: Various formatting elements are applied to paragraphs to demonstrate their visual effects.
\`\`\`End
\`\`\`Para
Subscript and Superscript: Scientific notation is shown using <sub> and <sup>.
\`\`\`End
\`\`\`Para
Small Text and Mark: Additional formatting elements are illustrated to highlight different styles.
\`\`\`End
\`\`\`Bold
Benefits of HTML Formatting
\`\`\`End
\`\`\`Para
Clarity: Proper formatting makes content clearer and easier to read.
\`\`\`End
\`\`\`Para
Emphasis: Important information can be highlighted using bold or italic text.
\`\`\`End
\`\`\`Para
Accessibility: Semantic elements (like <strong> and <em>) help screen readers convey meaning to visually impaired users.
\`\`\`End
\`\`\`Para
Using HTML formatting effectively enhances the presentation of text on web pages, improving user experience and content engagement.
\`\`\`End
`
},
{
title: "HTML Quotations",
 content: `
\`\`\`Para
HTML provides specific elements for quoting text, which helps convey that the text is a quotation or a reference to someone else's words. This not only aids in organization and clarity but also enhances the semantic structure of the document.
\`\`\`End

\`\`\`Bold
Common HTML Quotation Elements
\`\`\`End

\`\`\`Bold
Blockquote
\`\`\`End

\`\`\`Para
The <blockquote> element is used for larger quotes that are typically displayed as a block of text. It usually represents a section that is quoted from another source.
By default, browsers typically indent this element to visually separate it from surrounding text.
\`\`\`End

\`\`\`Code
<blockquote>
    The only limit to our realization of tomorrow is our doubts of today.
</blockquote>
\`\`\`End

\`\`\`Bold
Cite
\`\`\`End

\`\`\`Para
The <cite> element is used to reference the title of a work (like a book, article, or movie) when quoting or referencing it.
\`\`\`End

\`\`\`Code
<p>As stated in <cite>The Great Gatsby</cite>, “In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.”</p>
\`\`\`End

\`\`\`Bold
Q Element
\`\`\`End

\`\`\`Para
The <q> element is used for inline quotes. It typically renders the text within quotation marks.
\`\`\`End

\`\`\`Code
<p>He said, <q>The journey of a thousand miles begins with one step.</q></p>
\`\`\`End

\`\`\`Bold
Example of HTML Quotations
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Quotations Example</title>
    <style>
        blockquote {
            border-left: 4px solid #ccc;
            margin: 20px 0;
            padding-left: 15px;
            color: #555;
        }
    </style>
</head>
<body>
    <h1>Famous Quotes</h1>
    
    <h2>Blockquote Example</h2>
    <blockquote>
        “The only limit to our realization of tomorrow is our doubts of today.” 
        <cite>- Franklin D. Roosevelt</cite>
    </blockquote>

    <h2>Inline Quote Example</h2>
    <p>As Mahatma Gandhi once said, <q>An eye for an eye only ends up making the whole world blind.</q></p>

    <h2>Citation Example</h2>
    <p>In the book <cite>To Kill a Mockingbird</cite>, the narrator reflects on childhood innocence and moral growth.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Blockquote: The blockquote is styled with a left border to visually distinguish it from other text, and it includes a citation to the speaker.
\`\`\`End

\`\`\`Para
Inline Quote: The inline quote is used within a paragraph to provide emphasis on a specific statement.
\`\`\`End

\`\`\`Para
Cite: The cite element is used to reference a book title, indicating that the text pertains to that specific work.
\`\`\`End

\`\`\`Bold
Benefits of Using Quotation Elements
\`\`\`End

\`\`\`Para
Clarity: Using specific elements for quotes helps clarify the source of the information.
\`\`\`End

\`\`\`Para
Semantic Meaning: They provide semantic meaning to the text, which is useful for search engines and assistive technologies.
\`\`\`End

\`\`\`Para
Visual Distinction: Properly formatted quotes stand out, enhancing readability and engagement.
\`\`\`End

\`\`\`Para
Overall, using HTML quotations effectively contributes to a well-structured and meaningful document, improving both user experience and accessibility.
\`\`\`End
`
},
{
title: "HTML Comments",
 content: `
\`\`\`Para
HTML comments are used to insert notes or annotations in the HTML code that are not displayed in the browser. They are helpful for developers to leave reminders, explanations, or to temporarily disable parts of the code without deleting them.
\`\`\`End

\`\`\`Bold
Syntax for HTML Comments
\`\`\`End

\`\`\`Para
HTML comments are created using the following syntax:
\`\`\`End

\`\`\`COde
<!-- This is a comment -->
\`\`\`End

\`\`\`Bold
Characteristics of HTML Comments
\`\`\`End

\`\`\`Para
Not Rendered: Comments are not visible in the rendered web page; they are only visible in the source code.
\`\`\`End

\`\`\`Para
Useful for Documentation: Comments can explain sections of code, making it easier for others (or yourself) to understand later.
\`\`\`End

\`\`\`Para
Disabling Code: You can comment out code to prevent it from being executed without deleting it.
\`\`\`End

\`\`\`Bold
Example of HTML Comments
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Comments Example</title>
</head>
<body>
    <h1>My Favorite Foods</h1>
    
    <!-- This section lists my favorite fruits -->
    <h2>Fruits</h2>
    <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Cherries</li>
    </ul>
    
    <!-- The following section is currently under construction -->
    <h2>Vegetables</h2>
    <ul>
        <li>Carrots</li>
        <li>Spinach</li>
        <!-- <li>Broccoli</li> Uncomment when ready to include -->
    </ul>

    <!-- Remember to add a dessert section later -->
    <h2>Desserts</h2>
    <p>Check back for my favorite desserts!</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Comments for Sections: Comments like <!-- This section lists my favorite fruits --> clarify what the subsequent code does, making it easier to understand.
\`\`\`End

\`\`\`Para
Under Construction Note: A comment indicates that the vegetables section is a work in progress.
\`\`\`End

\`\`\`Para
Temporary Disablement: The broccoli item is commented out, so it won't appear in the list until the comment is removed.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Comments
\`\`\`End

\`\`\`Para
Improved Readability: Comments help clarify the purpose of various sections of code, making it easier for developers to understand the structure and functionality.
\`\`\`End

\`\`\`Para
Collaboration: When working in teams, comments can communicate intentions or areas that need attention.
\`\`\`End

\`\`\`Para
Maintenance: Comments provide a way to leave notes for future reference, helping in long-term code maintenance.
\`\`\`End
`
},
{
title: "HTML CSS",
 content: `
\`\`\`Para
HTML and CSS are two foundational technologies used in web development. While HTML (Hypertext Markup Language) is used for structuring content on the web, CSS (Cascading Style Sheets) is used for styling that content. Together, they enable developers to create visually appealing and well-structured web pages.
\`\`\`End

\`\`\`Bold
HTML (Hypertext Markup Language)
\`\`\`End

\`\`\`Para
Purpose: HTML is used to define the structure and layout of a web page. It consists of elements that can represent headings, paragraphs, images, links, lists, and more.
\`\`\`End

\`\`\`Para
Structure: HTML uses a system of tags to create elements. For example, <h1> defines a heading, and <p> defines a paragraph.
\`\`\`End

\`\`\`Bold
CSS (Cascading Style Sheets)
\`\`\`End

\`\`\`Para
Purpose: CSS is used to control the presentation of HTML elements. It defines how elements should be displayed on screen, paper, or in other media.
\`\`\`End

\`\`\`Para
Features: CSS allows for styling properties like color, font, spacing, layout, and responsiveness.
\`\`\`End

\`\`\`Bold
How HTML and CSS Work Together
\`\`\`End

\`\`\`Para
Separation of Concerns: HTML handles the structure, while CSS takes care of styling. This separation makes it easier to maintain and update web pages.
\`\`\`End

\`\`\`Para
Reusable Styles: CSS can be applied across multiple HTML documents, ensuring consistent design throughout a website.
\`\`\`End

\`\`\`Bold
Example of HTML and CSS
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML and CSS Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #555;
            line-height: 1.5;
        }
        .highlight {
            background-color: #ffeb3b;
            padding: 5px;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Web Page</h1>
        <p>This is a simple example of how <strong>HTML</strong> and <strong>CSS</strong> work together.</p>
        <p>The purpose of this text is to demonstrate the use of CSS for styling. You can see how we can make text <span class="highlight">stand out</span> using different styles.</p>
    </div>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
HTML Structure:
\`\`\`End

\`\`\`Para
The <h1> tag defines the main heading of the page.
\`\`\`End

\`\`\`Para
The <p> tags contain paragraphs of text that describe the content.
\`\`\`End

\`\`\`Para
A <div> with the class "container" wraps the content to apply specific styling.
\`\`\`End

\`\`\`Bold
CSS Styling:
\`\`\`End

\`\`\`Para
The body style sets a background color and font for the entire page.
\`\`\`End

\`\`\`Para
The h1 style centers the heading and sets its color.
\`\`\`End

\`\`\`Para
The p style adjusts the color and line height for better readability.
\`\`\`End

\`\`\`Para
The .highlight class changes the background color of the text it wraps.
\`\`\`End

\`\`\`Para
The .container class applies styling for maximum width, background color, padding, rounded corners, and shadow for a card-like effect.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML and CSS Together
\`\`\`End

\`\`\`Para
Enhanced User Experience: Properly structured and styled content is more appealing and easier to read.
\`\`\`End

\`\`\`Para
Consistency: CSS allows for uniform styling across multiple pages, creating a cohesive look for a website.
\`\`\`End

\`\`\`Para
Responsive Design: CSS can be used to create layouts that adapt to different screen sizes, improving usability on mobile devices.
\`\`\`End

`
},
{
title: "HTML Heading",
 content: `
\`\`\`Para
HTML links are created using the <a> (anchor) tag and are essential for navigating between pages and resources on the web. Links can connect to external websites, internal pages, downloadable files, or specific sections within the same page.
\`\`\`End

\`\`\`Bold
Key Attributes of HTML Links
\`\`\`End

\`\`\`Para
href: Specifies the URL (Uniform Resource Locator) of the page or resource the link points to. This is the most important attribute.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com">Visit Example</a>
\`\`\`End

\`\`\`Bold
target: Determines how the linked document will be displayed. Common values include:
\`\`\`End

\`\`\`Para
_blank: Opens the link in a new tab or window.
\`\`\`End

\`\`\`Para
_self: Opens the link in the same frame as it was clicked (default behavior).
\`\`\`End

\`\`\`Para
_parent: Opens the link in the parent frame.
\`\`\`End

\`\`\`Para
_top: Opens the link in the full body of the window.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com" target="_blank">Visit Example in New Tab</a>
\`\`\`End

\`\`\`Para
title: Provides additional information about the link. This text appears as a tooltip when hovering over the link.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com" title="Go to Example website">Visit Example</a>
\`\`\`End

\`\`\`Para
download: Indicates that the target will be downloaded when the link is clicked. This is used for files rather than web pages.
\`\`\`End

\`\`\`Code
<a href="file.pdf" download>Download PDF</a>
\`\`\`End

\`\`\`Para
rel: Specifies the relationship between the current document and the linked document. Common values include:
\`\`\`End

\`\`\`Para
nofollow: Tells search engines not to follow the link.
\`\`\`End

\`\`\`Para
noopener: Prevents the new page from being able to access the original page via the window.opener property.
\`\`\`End

\`\`\`Para
noreferrer: Prevents the browser from sending the referring page's URL to the new page.
\`\`\`End

\`\`\`Code
<a href="https://www.example.com" rel="noopener noreferrer" target="_blank">Secure Link</a>
\`\`\`End

\`\`\`Bold
Example of HTML Links
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Links Example</title>
</head>
<body>
    <h1>HTML Links</h1>

    <h2>External Links</h2>
    <p>Visit <a href="https://www.example.com" target="_blank" title="Go to Example website">Example</a> for more information.</p>

    <h2>Internal Links</h2>
    <p>Go to the <a href="#about">About Section</a> to learn more about us.</p>

    <h2>Download Links</h2>
    <p>Download the <a href="file.pdf" download>PDF document</a> for offline reading.</p>

    <h2>Anchor Links</h2>
    <p id="about">This is the About Section. Here you can find more details.</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
External Links: The first link takes users to an external website (Example.com) and opens it in a new tab due to the target="_blank" attribute.
\`\`\`End

\`\`\`Para
Internal Links: The second link navigates to a specific section within the same page using an anchor (#about). When clicked, it scrolls the page to the "About Section."
\`\`\`End

\`\`\`Para
Download Links: The third link allows users to download a PDF file directly when clicked.
\`\`\`End

\`\`\`Para
Anchor Links: The paragraph with id="about" serves as the target for the internal link, enabling smooth navigation.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Links
\`\`\`End

\`\`\`Para
Navigation: Links are fundamental for navigating between different pages and resources on the web.
\`\`\`End

\`\`\`Para
User Experience: Well-placed links enhance usability by allowing users to find related content easily.
\`\`\`End

\`\`\`Para
SEO: Properly structured links can improve a website's search engine ranking and visibility.
\`\`\`End
`
},
{
title: "HTML Images",
 content: `
\`\`\`Para
HTML images are used to embed pictures, graphics, and other visual content in web pages. Images enhance the user experience by making content more engaging and informative. The primary HTML element for including images is the <img> tag.
\`\`\`End

\`\`\`Bold
Key Attributes of the <img> Tag
\`\`\`End

\`\`\`Para
src (Source): Specifies the path to the image file. This can be a relative path (to a file on the same server) or an absolute URL (linking to an image on another server).
\`\`\`End

\`\`\`Code
<img src="images/photo.jpg" alt="Description of the image">
\`\`\`End

\`\`\`Para
alt (Alternative Text): Provides a textual description of the image. This is important for accessibility, as it helps visually impaired users understand the content of the image and is displayed if the image fails to load.
\`\`\`End

\`\`\`Code
<img src="images/photo.jpg" alt="A beautiful sunset over the mountains">
\`\`\`End

\`\`\`Para
width and height: Specify the dimensions of the image. You can set these in pixels or as a percentage of the containing element. It's generally better to use CSS for styling, but you can also set them directly in the HTML tag.
\`\`\`End

\`\`\`COde
<img src="images/photo.jpg" alt="Description" width="300" height="200">
\`\`\`End

\`\`\`Para
title: Provides additional information about the image, usually displayed as a tooltip when the mouse hovers over it.
\`\`\`End

\`\`\`Code
<img src="images/photo.jpg" alt="Description" title="Hover text here">
\`\`\`End

\`\`\`Para
loading: Specifies whether the image should be loaded lazily. This can improve page load performance by deferring the loading of images that are not immediately visible.
\`\`\`End

\`\`\`Code
<img src="images/photo.jpg" alt="Description" loading="lazy">
\`\`\`End

\`\`\`Bold
Example of HTML Images
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Images Example</title>
    <style>
        img {
            max-width: 100%; /* Responsive images */
            height: auto; /* Maintain aspect ratio */
        }
    </style>
</head>
<body>
    <h1>Image Examples</h1>

    <h2>Regular Image</h2>
    <img src="https://via.placeholder.com/300" alt="Placeholder Image" title="This is a placeholder image">

    <h2>Responsive Image</h2>
    <p>This image will resize based on the screen width:</p>
    <img src="https://via.placeholder.com/600" alt="Larger Placeholder Image" loading="lazy">

    <h2>Image with Dimensions</h2>
    <img src="https://via.placeholder.com/200" alt="Small Placeholder Image" width="200" height="200">
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Regular Image: The first image uses an external URL to display a placeholder image. The alt attribute provides a description for accessibility.
\`\`\`End

\`\`\`Para
Responsive Image: The second image demonstrates responsiveness, where the CSS ensures the image resizes based on the viewport size while maintaining its aspect ratio.
\`\`\`End

\`\`\`Para
Image with Dimensions: The third image has specified width and height attributes, creating a fixed-size image.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Images
\`\`\`End

\`\`\`Para
Visual Appeal: Images make web pages more engaging and visually appealing.
\`\`\`End

\`\`\`Para
Information Conveyance: Graphics can convey information quickly and effectively, enhancing understanding.
\`\`\`End

\`\`\`Para
Accessibility: Alt text helps ensure that all users, including those with disabilities, can understand the content.
\`\`\`End
`
},
{
title: "HTML Page Title",
 content: `
\`\`\`Para
The HTML page title is defined using the <title> tag and is an important part of any web page. It specifies the title of the document and is displayed in the browser's title bar or tab. Additionally, the title is used by search engines as the main headline in search results and is critical for SEO (Search Engine Optimization).
\`\`\`End

\`\`\`Bold
Importance of the HTML Page Title
\`\`\`End

\`\`\`Para
User Experience: A clear and descriptive title helps users understand the content of the page at a glance. It also aids in navigation when multiple tabs are open.
\`\`\`End

\`\`\`Para
SEO: Search engines use the title to index the page and rank it in search results. A well-crafted title can improve visibility and click-through rates.
\`\`\`End

\`\`\`Para
Bookmarking: When users bookmark a page, the title is usually saved as the name of the bookmark, making it easier for them to identify later.
\`\`\`End

\`\`\`Bold
Structure of the <title> Tag
\`\`\`End

\`\`\`Para
The <title> tag is placed within the <head> section of the HTML document and should be concise and descriptive. It is a good practice to keep titles under 60 characters to ensure they are fully displayed in search engine results.
\`\`\`End

\`\`\`Bold
Example of HTML Page Title
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website - Home</title>
    <meta name="description" content="Welcome to My Awesome Website, where you can find amazing content and resources!">
</head>
<body>
    <h1>Welcome to My Awesome Website</h1>
    <p>This is the home page where you can discover all the great things we offer!</p>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Placement: The <title> tag is located within the <head> section of the HTML document.
\`\`\`End

\`\`\`Para
Content: The title "My Awesome Website - Home" clearly describes the main focus of the page. Including the name of the site and the specific page helps with both branding and context.
\`\`\`End

\`\`\`Para
SEO Considerations: The <meta name="description"> tag is included for further SEO optimization, providing a brief summary of the page content.
\`\`\`End

\`\`\`Bold
Best Practices for Writing HTML Page Titles
\`\`\`End

\`\`\`Para
Be Descriptive: Use clear and relevant keywords that describe the content of the page.
\`\`\`End

\`\`\`Para
Keep it Concise: Aim for 50-60 characters to ensure full visibility in search results.
\`\`\`End

\`\`\`Para
Include Branding: Incorporate your website or brand name to build recognition.
\`\`\`End

\`\`\`Para
Avoid Keyword Stuffing: Use keywords naturally; avoid cramming too many into the title, as this can negatively affect SEO.
\`\`\`End
`
},
{
title: "HTML Tables",
 content: `
\`\`\`Para
HTML tables are used to present data in a structured format using rows and columns. Tables are particularly useful for displaying tabular data, such as schedules, financial reports, and comparisons.
\`\`\`End

\`\`\`Bold
Key Elements of HTML Tables
\`\`\`End

\`\`\`Para
<table>: The main container for the table.
\`\`\`End

\`\`\`Code
<table>
    <!-- Table content goes here -->
</table>
\`\`\`End

\`\`\`Para
<tr> (Table Row): Defines a row within the table.
\`\`\`End

\`\`\`Code
<tr>
    <!-- Table cells go here -->
</tr>
\`\`\`End

\`\`\`Para
<th> (Table Header): Defines a header cell in a table, usually displayed in bold and centered. Header cells are often used for the first row or first column.
\`\`\`End

\`\`\`Code
<th>Header</th>
\`\`\`End

\`\`\`Para
<td> (Table Data): Defines a standard cell in the table, which can contain text, images, links, etc.
\`\`\`End

\`\`\`Code
<td>Data</td>
\`\`\`End

\`\`\`Para
<caption>: (Optional) Provides a title or description for the table.
\`\`\`End

\`\`\`Code
<caption>Table Title</caption>
\`\`\`End

\`\`\`Bold
Example of an HTML Table
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Table Example</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse; /* Combine borders */
        }
        th, td {
            border: 1px solid #ddd; /* Border for table cells */
            padding: 8px; /* Padding for cell content */
            text-align: left; /* Align text to the left */
        }
        th {
            background-color: #f2f2f2; /* Header background color */
        }
    </style>
</head>
<body>
    <h1>Product List</h1>
    <table>
        <caption>List of Available Products</caption>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Apple</td>
                <td>$1.00</td>
                <td>50</td>
            </tr>
            <tr>
                <td>Banana</td>
                <td>$0.50</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Cherry</td>
                <td>$3.00</td>
                <td>20</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Table Structure: The table is enclosed within <table> tags. It includes a <caption> for context, describing the contents of the table.
\`\`\`End

\`\`\`Para
Header Row: The <thead> section contains a row defined with <tr>, which includes <th> elements for each column header: "Product Name," "Price," and "Quantity."
\`\`\`End

\`\`\`Para
Body Rows: The <tbody> section contains multiple rows (<tr>), each with data cells (<td>), representing different products.
\`\`\`End

\`\`\`Para
Styling: Basic CSS is applied to make the table more readable. It includes border styling, padding, and background colors for headers.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Tables
\`\`\`End

\`\`\`Para
Organization: Tables help organize data into a clear, structured format, making it easier to read and compare information.
\`\`\`End

\`\`\`Para
Accessibility: Properly structured tables can enhance accessibility for screen readers, providing context for visually impaired users.
\`\`\`End

\`\`\`Para
Data Presentation: Tables are ideal for displaying related data in a cohesive manner, making them useful for reports, schedules, and more.
\`\`\`End
`
},
{
title: "HTML Lists",
 content: `
\`\`\`Para
HTML lists are used to group and organize related items in a structured format. They enhance readability and help present information in a clear manner. There are three main types of lists in HTML: unordered lists, ordered lists, and description lists.
\`\`\`End

\`\`\`Bold
Unordered Lists (<ul>)
\`\`\`End

\`\`\`Para
An unordered list is used to group items that do not have a specific order. Items in an unordered list are typically marked with bullet points.
\`\`\`End

\`\`\`Bold
Syntax:
\`\`\`End

\`\`\`Code
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
\`\`\`End

\`\`\`Bold
Ordered Lists (<ol>)
\`\`\`End

\`\`\`Para
An ordered list is used for items that have a specific order or sequence. Items in an ordered list are usually numbered.
\`\`\`End

\`\`\`Bold
Syntax:
\`\`\`End

\`\`\`Code
<ol>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ol>
\`\`\`End

\`\`\`Bold
Description Lists (<dl>)
\`\`\`End

\`\`\`Para
A description list is used to define a list of terms and their descriptions. This is useful for glossaries or definitions.
\`\`\`End

\`\`\`Bold
Syntax:
\`\`\`End

\`\`\`Code
<dl>
    <dt>Term 1</dt>
    <dd>Description for Term 1.</dd>
    <dt>Term 2</dt>
    <dd>Description for Term 2.</dd>
</dl>
\`\`\`End

\`\`\`Bold
Example of HTML Lists
\`\`\`End

\`\`\`Para
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Lists Example</title>
</head>
<body>
    <h1>Types of Lists in HTML</h1>

    <h2>Unordered List</h2>
    <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Cherries</li>
    </ul>

    <h2>Ordered List</h2>
    <ol>
        <li>Preheat the oven to 350°F.</li>
        <li>Mix flour and sugar in a bowl.</li>
        <li>Bake for 20 minutes.</li>
    </ol>

    <h2>Description List</h2>
    <dl>
        <dt>HTML</dt>
        <dd>A markup language for creating web pages.</dd>
        <dt>CSS</dt>
        <dd>A stylesheet language for styling HTML documents.</dd>
        <dt>JavaScript</dt>
        <dd>A programming language for adding interactivity to web pages.</dd>
    </dl>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Unordered List: This list displays a set of fruits without a specific order, using bullet points for each item.
\`\`\`End

\`\`\`Para
Ordered List: This list presents a sequence of steps to follow when baking, with each step numbered to indicate the order.
\`\`\`End

\`\`\`Para
Description List: This list defines terms (HTML, CSS, and JavaScript) along with their respective descriptions, using <dt> for the term and <dd> for the description.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Lists
\`\`\`End

\`\`\`Para
Organization: Lists help structure content in a clear and organized manner, making it easier to read.
\`\`\`End

\`\`\`Para
Semantic Meaning: Using the appropriate list type provides semantic meaning to the content, which can enhance accessibility and SEO.
\`\`\`End

\`\`\`Para
User-Friendly: Lists make information easier to digest and can improve the overall user experience on a web page.
\`\`\`End
`
},
{
title: "HTML Heading",
 content: `
\`\`\`Para
In HTML, elements can be categorized as either block-level or inline elements. Understanding the difference between these two types is crucial for controlling the layout and flow of content on a web page.
\`\`\`End

\`\`\`Bold
Block-Level Elements
\`\`\`End

\`\`\`Para
Block-level elements occupy the full width of their parent container and start on a new line. They create a "block" of content that can contain other block-level or inline elements. Common 
block-level elements include:
\`\`\`End

\`\`\`Para
<div>: A generic container for grouping content.
\`\`\`End

\`\`\`Para
<h1>, <h2>, <h3>, etc.: Heading elements.
\`\`\`End

\`\`\`Para
<p>: Paragraph element.
\`\`\`End

\`\`\`Para
<ul>, <ol>, <li>: Lists.
\`\`\`End

\`\`\`Para
<table>: Table element.
\`\`\`End

\`\`\`Bold
Inline Elements
\`\`\`End

\`\`\`Para
Inline elements only take up as much width as necessary and do not start on a new line. They can be placed within block-level elements and will flow with the text. Common inline elements include:
\`\`\`End

\`\`\`Para
<span>: A generic inline container for styling.
\`\`\`End

\`\`\`Para
<a>: Anchor element for links.
\`\`\`End

\`\`\`Para
<strong>: Bold text.
\`\`\`End

\`\`\`Para
<em>: Italicized text.
\`\`\`End

\`\`\`Para
<img>: Image element.
\`\`\`End

\`\`\`Para
Example of Block and Inline Elements
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block and Inline Elements Example</title>
    <style>
        .block {
            background-color: #f4f4f4;
            padding: 10px;
            margin: 10px 0;
        }
        .inline {
            color: #007bff;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Understanding Block and Inline Elements</h1>
    
    <div class="block">
        <h2>This is a Block-Level Element</h2>
        <p>This paragraph is another block-level element. It starts on a new line and takes up the full width of the container.</p>
    </div>
    
    <div class="block">
        <h2>Mixing Block and Inline Elements</h2>
        <p>This is a paragraph with some <span class="inline">inline text</span> that has a different style.</p>
        <p>You can also use <a href="#">inline links</a> within block elements.</p>
    </div>
</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Block-Level Elements
\`\`\`End

\`\`\`Para
The <div> elements act as containers for grouping content and start on new lines. They are styled with a background color, padding, and margin to visually distinguish them.
\`\`\`End

\`\`\`Para
The <h2> and <p> elements inside the <div> are also block-level elements, creating separate blocks of content.
\`\`\`End

\`\`\`Bold
Inline Elements
\`\`\`End

\`\`\`Para
The <span class="inline"> element is used to style a portion of text within a paragraph without breaking the flow. It only takes up the space necessary for the text.
\`\`\`End

\`\`\`Para
The <a> element (link) is also an inline element that can be placed within the block of text without starting a new line.
\`\`\`End

\`\`\`Bold
Key Differences
\`\`\`End

\`\`\`Bold
Display Behavior:
\`\`\`End

\`\`\`Para
Block-level elements start on a new line and expand to fill the width of their container.
\`\`\`End

\`\`\`Para
Inline elements do not start on a new line and only take up as much width as needed.
\`\`\`End

\`\`\`Bold
Usage:
\`\`\`End

\`\`\`Para
Block-level elements are used to create larger sections of content.
\`\`\`End

\`\`\`Para
Inline elements are typically used for styling or linking parts of text within those sections.
\`\`\`End
`
},
{
title: "HTML Div",
 content: `

\`\`\`Para
The <div> element in HTML is a versatile block-level container that is commonly used to group content and apply styles or layouts. It does not have any semantic meaning on its own, making it a neutral element that can be styled with CSS and manipulated with JavaScript.
\`\`\`End

\`\`\`Bold
Key Features of the <div> Element
\`\`\`End

\`\`\`Para
Block-Level Element: The <div> element is a block-level element, meaning it starts on a new line and takes up the full width of its parent container.
\`\`\`End

\`\`\`Para
Container for Other Elements: It can contain other HTML elements, such as headings, paragraphs, images, and even other <div> elements, making it useful for creating complex layouts.
\`\`\`End

\`\`\`Para
Styling: The <div> is often used in conjunction with CSS to apply styles, such as background colors, borders, padding, margins, and more.
\`\`\`End

\`\`\`Para
JavaScript Manipulation: <div> elements can be easily selected and manipulated using JavaScript, making them useful for dynamic content.
\`\`\`End

\`\`\`Bold
Example of Using the <div> Element
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Div Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .header {
            background-color: #4CAF50; /* Green */
            color: white;
            text-align: center;
            padding: 15px;
        }
        .content {
            margin: 20px;
            padding: 20px;
            background-color: #f9f9f9; /* Light grey */
            border: 1px solid #ddd;
        }
        .footer {
            background-color: #222; /* Dark grey */
            color: white;
            text-align: center;
            padding: 10px;
            position: relative;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Welcome to My Website</h1>
        <p>Your one-stop solution for everything!</p>
    </div>

    <div class=content>
        <h2>About Us</h2>
        <p>We are a team of dedicated professionals committed to providing high-quality services.</p>
        
        <h2>Services</h2>
        <p>We offer a variety of services tailored to meet your needs.</p>
    </div>

    <div class="footer">
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Header Section: The first <div> with the class header contains the website's title and a brief description. It is styled with a green background and white text.
\`\`\`End

\`\`\`Para
Content Section: The second <div> with the class content serves as the main content area. It includes headings and paragraphs to describe the website and its services. It has light grey background color, padding, and a border for visual separation.
\`\`\`End

\`\`\`Para
Footer Section: The third <div> with the class footer provides footer information and is styled with a dark grey background and white text.
\`\`\`End

\`\`\`Bold
Benefits of Using <div>
\`\`\`End

\`\`\`Para
Flexibility: <div> elements can be styled and positioned easily, making them useful for various layout designs.
\`\`\`End

\`\`\`Para
Organization: By grouping related content within <div> elements, you can create a more organized and structured HTML document.
\`\`\`End

\`\`\`Para
Responsive Design: When combined with CSS frameworks and techniques (like Flexbox or Grid), <div> elements can help create responsive layouts that adjust to different screen sizes.
\`\`\`End
`
},

{
title: "HTML Classes",
 content: `

\`\`\`Para
In HTML, classes are used to apply the same styles to multiple elements or to identify specific elements for styling or scripting. The class attribute can be added to any HTML element, and it can hold one or more class names, allowing for flexible and reusable styling.
\`\`\`End

\`\`\`Bold
Key Features of HTML Classes
\`\`\`End

\`\`\`Para
Reusability: Classes allow you to apply the same styles to multiple elements without repeating CSS rules. This promotes consistency and simplifies maintenance.
\`\`\`End

\`\`\`Para
Multiple Classes: An element can have multiple classes separated by spaces, enabling the combination of different styles and behaviors.
\`\`\`End

\`\`\`Para
Targeting with CSS and JavaScript: Classes can be targeted using CSS for styling and JavaScript for DOM manipulation, making them versatile for both design and functionality.
\`\`\`End

\`\`\`Bold
Example of Using HTML Classes
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Classes Example</title>
    <style>
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
        }
        .header {
            background-color: #4CAF50; /* Green */
            color: white;
            text-align: center;
            padding: 15px;
        }
        .content {
            background-color: #f9f9f9; /* Light grey */
            padding: 20px;
            margin: 10px 0;
        }
        .footer {
            background-color: #222; /* Dark grey */
            color: white;
            text-align: center;
            padding: 10px;
        }
        .highlight {
            color: #FF5722; /* Orange */
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>Welcome to My Website</h1>
        </div>

        <div class=content>
            <h2>About Us</h2>
            <p>We are a dedicated team committed to providing high-quality services. <span class="highlight">Our goal is customer satisfaction!</span></p>
        </div>

        <div class="footer">
            <p>&copy; 2024 My Website. All rights reserved.</p>
        </div>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Container Class: The .container class centers the content, applies padding, and adds a border, providing a structured layout for the entire page.
\`\`\`End

\`\`\`Para
Header Class: The .header class styles the header section with a green background, white text, and center alignment.
\`\`\`End

\`\`\`Para
Content Class: The .content class styles the main content area with a light grey background and padding.
\`\`\`End

\`\`\`Para
Footer Class: The .footer class gives the footer a dark grey background and centers the text.
\`\`\`End

\`\`\`Para
Highlight Class: The .highlight class is used to style specific text within the content, changing its color to orange and making it bold. This demonstrates how you can apply additional styles to specific parts of text.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML Classes
\`\`\`End

\`\`\`Para
Efficiency: Classes enable the reuse of styles across multiple elements, reducing redundancy in your CSS.
\`\`\`End

\`\`\`Para
Maintainability: When styles need to change, updating the class definition in CSS will automatically reflect the changes across all elements using that class.
\`\`\`End

\`\`\`Para
Semantic Grouping: Using meaningful class names helps clarify the purpose of elements, improving the readability of the HTML code.
\`\`\`End

\`\`\`Para
JavaScript Interaction: Classes can be used to easily select and manipulate elements with JavaScript, facilitating dynamic content updates.
\`\`\`End
`
},

{
title: "HTML Id",
 content: `
\`\`\`Para
In HTML, the id attribute is used to uniquely identify an element within a document. Each id must be unique within a page, meaning no two elements should have the same id. This uniqueness allows for precise styling and manipulation of specific elements using CSS and JavaScript.
\`\`\`End

\`\`\`Bold
Key Features of HTML id
\`\`\`End

\`\`\`Para
Uniqueness: An id can only be used once per page. This makes it useful for targeting a specific element without ambiguity.
\`\`\`End

\`\`\`Para
Styling with CSS: The id can be used in CSS to apply styles directly to a specific element.
\`\`\`End

\`\`\`Para
JavaScript Manipulation: The id can be used to select elements for DOM manipulation, making it easy to interact with specific elements.
\`\`\`End

\`\`\`Para
Anchor Links: You can create anchor links that navigate directly to an element with a specific id on the page.
\`\`\`End

\`\`\`Bold
Example of Using HTML id
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML ID Example</title>
    <style>
        #header {
            background-color: #4CAF50; /* Green */
            color: white;
            text-align: center;
            padding: 15px;
        }
        #content {
            margin: 20px;
            padding: 20px;
            background-color: #f9f9f9; /* Light grey */
            border: 1px solid #ddd;
        }
        #footer {
            background-color: #222; /* Dark grey */
            color: white;
            text-align: center;
            padding: 10px;
        }
        #highlight {
            color: #FF5722; /* Orange */
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div id="header">
        <h1>Welcome to My Website</h1>
    </div>

    <div id=content>
        <h2>About Us</h2>
        <p>We are a dedicated team committed to providing high-quality services. <span id="highlight">Our goal is customer satisfaction!</span></p>
    </div>

    <div id="footer">
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Header Section: The <div> with id="header" is styled with a green background and white text, providing a distinct header for the page.
\`\`\`End

\`\`\`Para
Content Section: The <div> with id=content serves as the main content area, featuring padding, margin, and a light grey background.
\`\`\`End

\`\`\`Para
Footer Section: The <div> with id="footer" styles the footer with a dark grey background and centers the text.
\`\`\`End

\`\`\`Para
Highlight Text: The <span> with id="highlight" styles specific text within the content, changing its color to orange and making it bold.
\`\`\`End

\`\`\`Bold
Benefits of Using HTML id
\`\`\`End

\`\`\`Para
Specific Targeting: The id attribute allows for precise targeting of elements in CSS and JavaScript, which is particularly useful in larger documents.
\`\`\`End

\`\`\`Para
Anchor Navigation: You can create links that jump directly to sections of a page using the id:
\`\`\`End

\`\`\`Code
<a href="#content">Go to Content</a>
\`\`\`End

\`\`\`Para
Simplicity: Using id can simplify your code and make it easier to reference specific elements without confusion.
\`\`\`End

\`\`\`Para
CSS Specificity: Styles applied via an id are more specific than those applied via classes, which means they will take precedence in the case of conflicting styles.
\`\`\`End
`
},


{
title: "HTML Iframe",
 content: `
\`\`\`Para
HTML <iframe> (inline frame) is used to embed another document within the current HTML document. This allows you to display content from external sources, such as another webpage, a video, a map, or an advertisement, without having to navigate away from the current page.
\`\`\`End

\`\`\`Bold
Key Features of <iframe>
\`\`\`End

\`\`\`Para
Embedding Content: An <iframe> can embed a variety of content, including HTML pages, videos, and other media.
\`\`\`End

\`\`\`Para
Attributes: The <iframe> element supports several attributes that control its behavior and appearance:
\`\`\`End

\`\`\`Para
src: Specifies the URL of the document to embed.
\`\`\`End

\`\`\`Para
width and height: Define the size of the iframe.
\`\`\`End

\`\`\`Para
frameborder: (Deprecated in HTML5) Specifies whether to display a border around the iframe.
\`\`\`End

\`\`\`Para
allowfullscreen: Enables fullscreen mode for embedded content (like videos).
\`\`\`End

\`\`\`Para
sandbox: Enables a set of restrictions for the content, enhancing security.
\`\`\`End

\`\`\`Para
title: Provides a title for the iframe for accessibility purposes.
\`\`\`End

\`\`\`Para
Scrolling: The scrolling attribute controls whether or not scrollbars are displayed.
\`\`\`End

\`\`\`Bold
Example of Using <iframe>
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Iframe Example</title>
    <style>
        .iframe-container {
            margin: 20px 0;
        }
        iframe {
            border: 1px solid #ccc; /* Light grey border */
        }
    </style>
</head>
<body>

    <h1>Embedding Content with Iframes</h1>

    <div class="iframe-container">
        <h2>Google Map</h2>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097436!2d144.9537353153184!3d-37.81627997975121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f1a1c73%3A0xd3a1f0cf8c4a8e8!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1622524848343!5m2!1sen!2sau" 
            width="600" 
            height="450" 
            allowfullscreen="" 
            loading="lazy" 
            title="Google Map">
        </iframe>
    </div>

    <div class="iframe-container">
        <h2>YouTube Video</h2>
        <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/tgbNymZ7vqY" 
            title="YouTube Video" 
            allowfullscreen>
        </iframe>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Google Map:
\`\`\`End

\`\`\`Para
The first <iframe> embeds a Google Map. The src attribute contains the embed URL for a specific location (in this case, Federation Square in Melbourne). The width and height define the size of the map display, and the allowfullscreen attribute allows the map to be viewed in fullscreen mode.
\`\`\`End

\`\`\`Para
YouTube Video:
\`\`\`End

\`\`\`Para
The second <iframe> embeds a YouTube video. The src attribute points to the embed link for the video. Similar to the map, it also includes width and height attributes.
\`\`\`End

\`\`\`Bold
Benefits of Using <iframe>
\`\`\`End

\`\`\`Para
Embedding External Content: <iframe> allows you to integrate external resources directly into your web page without needing to host that content yourself.
\`\`\`End

\`\`\`Para
Dynamic Content: You can display dynamic content, such as maps or videos, that can change or update independently of your main page.
\`\`\`End

\`\`\`Para
Improved User Experience: By embedding content like videos or maps, users can interact with additional features without navigating away from your site.
\`\`\`End

\`\`\`Bold
Considerations
\`\`\`End

\`\`\`Para
Security: Be cautious when embedding content from untrusted sources, as this could pose security risks.
\`\`\`End

\`\`\`Para
Responsiveness: By default, iframes can be rigid in their dimensions. CSS may be needed to make them responsive to different screen sizes.
\`\`\`End

\`\`\`Para
Performance: Loading multiple iframes can affect the performance of your page, especially if the embedded content is heavy.
\`\`\`End
`
},

{
title: "HTML Heading",
 content: `
\`\`\`Para
HTML and JavaScript work together to create dynamic and interactive web pages. HTML provides the structure of the page, while JavaScript adds functionality and interactivity. By using JavaScript, you can manipulate HTML elements, respond to user actions, and create a more engaging experience.
\`\`\`End

\`\`\`Bold
Key Features of JavaScript in HTML
\`\`\`End

\`\`\`Para
Script Tags: JavaScript code is usually included in HTML documents using the <script> tag. You can place this tag in the <head> or <body> section of the HTML document.
\`\`\`End

\`\`\`Para
DOM Manipulation: JavaScript can manipulate the Document Object Model (DOM), allowing you to change the content, structure, and style of web pages dynamically.
\`\`\`End

\`\`\`Para
Event Handling: JavaScript can respond to user actions, such as clicks, mouse movements, keyboard input, and more, enabling interactive features.
\`\`\`End

\`\`\`Para
Client-Side Scripting: JavaScript runs in the user's browser, which allows for quick responses to user interactions without needing to communicate with the server.
\`\`\`End

\`\`\`Bold
Example of Using JavaScript in HTML
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML and JavaScript Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #message {
            margin-top: 20px;
            font-size: 20px;
            color: #4CAF50; /* Green */
        }
    </style>
</head>
<body>

    <h1>Welcome to My Website</h1>
    <p>Click the button to see a message:</p>
    <button id="myButton">Click Me!</button>

    <div id="message"></div>

    <script>
        // Get references to the button and message elements
        const button = document.getElementById('myButton');
        const messageDiv = document.getElementById('message');

        // Add an event listener to the button
        button.addEventListener('click', function() {
            // Change the content of the message div
            messageDiv.textContent = 'Hello! You clicked the button!';
        });
    </script>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
HTML Structure: The HTML consists of a heading, a paragraph prompting the user to click a button, and a div element where the message will appear.
\`\`\`End

\`\`\`Para
Button Element:The <button> element has an id of myButton, which will be used to reference it in JavaScript.
\`\`\`End

\`\`\`Para
Message Div:The <div> with id="message" will display the message when the button is clicked.
\`\`\`End

\`\`\`Para
JavaScript Code:The <script> tag contains JavaScript code that runs when the page loads.
\`\`\`End

\`\`\`Para
The getElementById method retrieves references to the button and message elements.
\`\`\`End

\`\`\`Para
An event listener is added to the button that listens for the click event. When the button is clicked, the textContent of the messageDiv is updated to display a message.
\`\`\`End

\`\`\`Bold
Benefits of Using JavaScript in HTML
\`\`\`End

\`\`\`Para
Interactivity: JavaScript enables developers to create interactive elements that respond to user actions, enhancing user experience.
\`\`\`End

\`\`\`Para
Dynamic Content: You can update the content of web pages dynamically based on user interactions or other events without requiring a page reload.
\`\`\`End

\`\`\`Para
Improved Performance: Since JavaScript runs in the browser, it can process user actions quickly, reducing the need for server communication for every interaction.
\`\`\`End

\`\`\`Para
Rich User Interfaces: JavaScript can be used alongside frameworks and libraries (like React, Angular, or jQuery) to create sophisticated and responsive user interfaces.
\`\`\`End

\`\`\`Bold
Considerations
\`\`\`End

\`\`\`Para
Browser Compatibility: While modern browsers support JavaScript, some features may not work in older versions, so testing is important.
\`\`\`End

\`\`\`Para
Performance: Heavy use of JavaScript can impact page load times and performance, so it should be optimized for efficiency.
\`\`\`End

\`\`\`Para
Security: Be cautious with user inputs and external scripts to avoid security vulnerabilities such as Cross-Site Scripting (XSS).
\`\`\`End
`
},

{
title: "CSS Introduction",
 content: `
\`\`\`Para
CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation and layout of HTML documents. It allows web developers to control the visual appearance of web pages, enabling them to separate content from design. With CSS, you can set styles for elements, including colors, fonts, spacing, positioning, and responsiveness.
\`\`\`End

\`\`\`Bold
Key Features of CSS
\`\`\`End

\`\`\`Para
Separation of Content and Presentation: CSS allows you to keep HTML (content) separate from styling. This makes the code cleaner and easier to maintain.
\`\`\`End

\`\`\`Para
Selectors: CSS uses selectors to apply styles to specific elements. Selectors can target elements by tag name, class, id, attributes, and more.
\`\`\`End

\`\`\`Para
Cascading and Specificity: CSS stands for "Cascading" because styles can cascade from one rule to another. Styles can be overridden based on specificity, where more specific selectors take precedence over more general ones.
\`\`\`End

\`\`\`Para
Responsive Design: CSS provides techniques such as media queries that allow web pages to adapt their layout and appearance based on the device's screen size, making them accessible on mobile, tablet, and desktop devices.
\`\`\`End

\`\`\`Para
Flexibility and Control: CSS gives developers fine-grained control over the layout, colors, fonts, and overall look of a website.
\`\`\`End

\`\`\`Bold
Example of Using CSS
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Introduction Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4; /* Light grey background */
        }
        h1 {
            color: #333; /* Dark grey color */
            text-align: center;
            padding: 20px;
        }
        p {
            color: #666; /* Medium grey color */
            line-height: 1.5;
            padding: 0 20px;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            background-color: #fff; /* White background */
            border: 1px solid #ccc; /* Light grey border */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a simple example of using CSS to style an HTML document. You can see how colors, fonts, and layout can be controlled with CSS.</p>
        <p>By separating CSS from HTML, we can maintain and update styles without affecting the underlying content.</p>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
HTML Structure:
\`\`\`End

\`\`\`Para
The HTML contains a heading (<h1>) and two paragraphs (<p>) wrapped inside a <div> with the class container.
\`\`\`End

\`\`\`Bold
CSS Styles:
\`\`\`End

\`\`\`Para
The <style> tag in the <head> section contains CSS rules that apply styles to the HTML elements:
\`\`\`End

\`\`\`Para
The body rule sets the font, removes margins, adds padding, and gives a light grey background color.
\`\`\`End

\`\`\`Para
The h1 rule styles the main heading with a dark grey color, center alignment, and padding.
\`\`\`End

\`\`\`Para
The p rule sets the text color, line height, and padding for paragraphs.
\`\`\`End

\`\`\`Para
The .container class styles the div with maximum width, centered alignment, white background, border, rounded corners, and a subtle shadow.
\`\`\`End

\`\`\`Bold
Benefits of Using CSS
\`\`\`End

\`\`\`Para
Improved Design Control: CSS provides extensive control over the appearance of web pages, allowing for visually appealing designs.
\`\`\`End

\`\`\`Para
Consistent Styling: By using classes and external stylesheets, you can ensure consistent styling across multiple pages of a website.
\`\`\`End

\`\`\`Para
Enhanced Performance: CSS allows for better page load performance since styles can be cached and applied across different pages.
\`\`\`End

\`\`\`Para
Accessibility: By separating content and presentation, CSS makes it easier to maintain accessibility standards, such as screen reader compatibility.
\`\`\`End

\`\`\`Para
Responsive Design: CSS techniques allow developers to create layouts that adapt to different screen sizes and devices, improving user experience.
\`\`\`End
`
},

{
title: "CSS Syntax",
 content: `
\`\`\`Para
CSS (Cascading Style Sheets) syntax is the set of rules used to define how HTML elements should be displayed on a webpage. Understanding CSS syntax is essential for effectively styling web pages. Here’s a breakdown of the key components of CSS syntax:
\`\`\`End

\`\`\`Bold
Key Components of CSS Syntax
\`\`\`End

\`\`\`Para
Selector: This specifies the HTML element(s) to which the styles will be applied. Selectors can be:
\`\`\`End

\`\`\`Para
Type Selector: Targets all instances of a specific HTML element (e.g., p for paragraphs).
\`\`\`End

\`\`\`Para
Class Selector: Targets elements with a specific class (e.g., .className).
\`\`\`End

\`\`\`Para
ID Selector: Targets a unique element with a specific ID (e.g., #idName).
\`\`\`End

\`\`\`Para
Attribute Selector: Targets elements with a specific attribute (e.g., [type="text"]).
\`\`\`End

\`\`\`Para
Declaration Block: This is enclosed in curly braces {} and contains one or more declarations, each specifying a property and its value.
\`\`\`End

\`\`\`Para
Property: This defines the aspect of the element you want to change (e.g., color, font-size, margin).
\`\`\`End

\`\`\`Para
Value: This is the setting you want to apply to the property (e.g., red, 16px, 10%).
\`\`\`End

\`\`\`Bold
CSS Syntax Structure
\`\`\`End

\`\`\`Code
selector {
    property: value;
    property: value;
}
\`\`\`End

\`\`\`Bold
Example of CSS Syntax
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Syntax Example</title>
    <style>
        /* Type Selector */
        h1 {
            color: blue; /* Changes text color to blue */
            font-size: 2em; /* Sets font size to 2em */
            text-align: center; /* Centers the heading */
        }

        /* Class Selector */
        .paragraph {
            color: green; /* Changes text color to green */
            line-height: 1.5; /* Sets line height for better readability */
            margin: 20px; /* Adds margin around paragraphs */
        }

        /* ID Selector */
        #main {
            background-color: #f0f0f0; /* Light grey background */
            padding: 20px; /* Adds padding inside the element */
            border: 1px solid #ccc; /* Light grey border */
            border-radius: 8px; /* Rounds the corners */
        }
    </style>
</head>
<body>

    <div id="main">
        <h1>Welcome to My Website</h1>
        <p class="paragraph">This is a simple example of CSS syntax in action. It shows how to style different HTML elements.</p>
        <p class="paragraph">Using CSS, you can control the appearance of your website easily and efficiently.</p>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Type Selector: The rule for h1 targets all <h1> elements, changing their text color to blue, setting the font size to 2em, and aligning the text to the center.
\`\`\`End

\`\`\`Para
Class Selector: The rule for .paragraph applies to any element with the class paragraph. It sets the text color to green, increases the line height for readability, and adds a margin around the paragraphs.
\`\`\`End

\`\`\`Para
ID Selector: The rule for #main targets the <div> with the id main. It gives the div a light grey background, adds padding inside the element, and applies a border with rounded corners.
\`\`\`End

\`\`\`Para
Benefits of Understanding CSS Syntax
\`\`\`End

\`\`\`Para
Effective Styling: Knowing CSS syntax allows you to apply styles correctly and effectively to achieve the desired appearance for your website.
\`\`\`End

\`\`\`Para
Modular Design: Using classes and IDs helps create modular and reusable styles, making it easier to maintain and update your designs.
\`\`\`End

\`\`\`Para
Enhanced Readability: Well-structured CSS syntax improves the readability of your stylesheets, making it easier to identify and modify styles as needed.
\`\`\`End

\`\`\`Para
Cross-Browser Compatibility: Understanding CSS syntax helps ensure that your styles are rendered consistently across different web browsers.
\`\`\`End
`
},

{
title: "CSS Selectors",
 content: `
\`\`\`Para
CSS selectors are patterns used to select the elements you want to style in your HTML documents. They play a crucial role in determining which elements are affected by specific CSS rules. Understanding different types of selectors allows you to write more efficient and organized styles.
\`\`\`End

\`\`\`Bold
Types of CSS Selectors
\`\`\`End

\`\`\`Para
Universal Selector (*): Selects all elements on the page.
\`\`\`End

\`\`\`Code
* {
    margin: 0;
    padding: 0;
}
\`\`\`End

\`\`\`Para
Type Selector: Selects elements by their tag name.
\`\`\`End

\`\`\`Code
p {
    color: blue;
}
\`\`\`End

\`\`\`Para
Class Selector (.): Selects elements with a specific class attribute.
\`\`\`End

\`\`\`Code
.highlight {
    background-color: yellow;
}
\`\`\`End

\`\`\`Para
ID Selector (#): Selects a single element with a specific ID.
\`\`\`End

\`\`\`Code
#header {
    font-size: 24px;
}
\`\`\`End

\`\`\`Para
Attribute Selector: Selects elements based on specific attributes.
\`\`\`End

\`\`\`Para
Example: Selects input elements of type "text".
\`\`\`End

\`\`\`Code
input[type="text"] {
    border: 1px solid #ccc;
}
\`\`\`End

\`\`\`Para
Descendant Selector: Selects elements that are descendants of a specified element.
\`\`\`End

\`\`\`Code
div p {
    color: green;
}
\`\`\`End

\`\`\`Para
Child Selector (>): Selects elements that are direct children of a specified element.
\`\`\`End

\`\`\`Code
ul > li {
    list-style-type: square;
}
\`\`\`End

\`\`\`Para
Adjacent Sibling Selector (+): Selects an element that is immediately following a specified element.
\`\`\`End

\`\`\`Code
h1 + p {
    margin-top: 0;
}
\`\`\`End

\`\`\`Para
General Sibling Selector (~): Selects all siblings that follow a specified element.
\`\`\`End

\`\`\`Code
h1 ~ p {
    color: gray;
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Selectors
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Selectors Example</title>
    <style>
        /* Universal Selector */
        * {
            box-sizing: border-box;
        }

        /* Type Selector */
        h1 {
            color: navy;
            text-align: center;
        }

        /* Class Selector */
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }

        /* ID Selector */
        #main {
            padding: 20px;
            border: 1px solid #ddd;
        }

        /* Attribute Selector */
        input[type="text"] {
            width: 200px;
            padding: 5px;
        }

        /* Descendant Selector */
        #main p {
            font-size: 16px;
        }

        /* Child Selector */
        ul > li {
            color: darkgreen;
        }

        /* Adjacent Sibling Selector */
        h1 + p {
            margin-top: 0;
        }

        /* General Sibling Selector */
        h1 ~ p {
            color: gray;
        }
    </style>
</head>
<body>

    <h1>Welcome to My Website</h1>
    <p>This is a simple example demonstrating CSS selectors.</p>

    <div id="main">
        <p class="highlight">This paragraph is highlighted.</p>
        <p>This is another paragraph in the main section.</p>
        
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
        </ul>
        
        <input type="text" placeholder="Type something...">
    </div>

    <p>This paragraph follows the main header.</p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Universal Selector: Sets the box-sizing property for all elements to make sizing easier.
\`\`\`End

\`\`\`Para
Type Selector: Styles the <h1> element with a navy color and centers the text.
\`\`\`End

\`\`\`Para
Class Selector: The .highlight class gives a yellow background and bold font to specific paragraphs.
\`\`\`End

\`\`\`Para
ID Selector: The #main ID styles the main content area with padding and a border.
\`\`\`End

\`\`\`Para
Attribute Selector: Styles text input elements with specific padding and width.
\`\`\`End

\`\`\`Para
Descendant Selector: The #main p selector styles paragraphs within the #main div.
\`\`\`End

\`\`\`Para
Child Selector: The ul > li selector applies styles only to list items that are direct children of a <ul>.
\`\`\`End

\`\`\`Para
Adjacent Sibling Selector: The h1 + p selector targets the first paragraph immediately following an <h1>, removing its top margin.
\`\`\`End

\`\`\`Para
General Sibling Selector: The h1 ~ p selector styles all paragraphs that follow an <h1> with gray text.
\`\`\`End

\`\`\`Bold
Benefits of Understanding CSS Selectors
\`\`\`End

\`\`\`Para
Precise Targeting: Knowing how to use various selectors allows you to target specific elements precisely, leading to more efficient and maintainable styles.
\`\`\`End

\`\`\`Para
Code Efficiency: Using selectors effectively can reduce the amount of code you write and minimize redundancy.
\`\`\`End

\`\`\`Para
Improved Readability: Well-structured selectors improve the readability of your stylesheets, making it easier to understand which elements are being styled.
\`\`\`End

\`\`\`Para
Responsive Design: Understanding selectors helps in creating responsive designs, allowing for targeted styles based on screen size or other conditions.
\`\`\`End
`
},

{
title: "How to add CSS",
 content: `
\`\`\`Para
Adding CSS (Cascading Style Sheets) to your HTML documents can be done in several ways, each serving different purposes depending on the project. Here’s an overview of the methods for adding CSS, along with examples for each.
\`\`\`End

\`\`\`Bold
Methods to Add CSS
\`\`\`End

\`\`\`Bold
Inline CSS:
\`\`\`End

\`\`\`Para
This method involves adding styles directly to an HTML element using the style attribute. It is useful for quick, one-off styling but can lead to less maintainable code.
\`\`\`End

\`\`\`Bold
Example:
\`\`\`End

\`\`\`COde
<h1 style="color: blue; text-align: center;">Welcome to My Website</h1>
\`\`\`End

\`\`\`Bold
Internal CSS:
\`\`\`End

\`\`\`Para
Internal CSS is defined within a <style> tag in the <head> section of an HTML document. This method is useful for styling a single document and keeps styles centralized.
\`\`\`End

\`\`\`Bold
Example:
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internal CSS Example</title>
    <style>
        body {
            background-color: #f0f0f0;
        }
        h1 {
            color: darkblue;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
</body>
</html>
\`\`\`End

\`\`\`Bold
External CSS:
\`\`\`End

\`\`\`Para
External CSS involves linking to a separate CSS file from your HTML document. This is the most efficient method for larger projects as it allows for styles to be reused across multiple pages, promoting maintainability.
\`\`\`End

\`\`\`Bold
Example:
\`\`\`End

\`\`\`Para
style.css (the external CSS file):
\`\`\`End

\`\`\`Code
body {
    background-color: #f0f0f0;
}
h1 {
    color: darkblue;
    text-align: center;
}
\`\`\`End

\`\`\`Para
index.html (the HTML file):
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>External CSS Example</title>
    <link rel="stylesheet" href="style.css"> <!-- Link to external CSS file -->
</head>
<body>
    <h1>Welcome to My Website</h1>
</body>
</html>
\`\`\`End

\`\`\`Bold
Summary of Methods
\`\`\`End

\`\`\`Para
Inline CSS: Quick and specific, but can lead to cluttered HTML and is not reusable.
\`\`\`End

\`\`\`Para
Internal CSS: Good for single documents, keeps styles centralized but not reusable across multiple pages.
\`\`\`End

\`\`\`Para
External CSS: Best for larger projects, allows for style reuse, promotes cleaner code, and improves maintainability.
\`\`\`End

\`\`\`Bold
Benefits of Using CSS
\`\`\`End

\`\`\`Para
Separation of Concerns: CSS keeps styling separate from HTML structure, making both easier to manage.
\`\`\`End

\`\`\`Para
Reusability: External styles can be reused across multiple pages, promoting consistent design.
\`\`\`End

\`\`\`Para
Maintainability: Changes can be made in one place (the CSS file) instead of throughout multiple HTML documents.
\`\`\`End

\`\`\`Para
Improved Load Times: Browsers cache external CSS files, which can speed up page loading times for returning visitors.
\`\`\`End
`
},

{
title: "CSS Comment",
 content: `
\`\`\`Para
CSS comments are annotations in your stylesheets that are ignored by the browser. They are useful for documenting your code, explaining styles, or temporarily disabling certain CSS rules during development. Comments improve the readability and maintainability of your stylesheets, especially in complex projects.
\`\`\`End

\`\`\`Bold
Syntax for CSS Comments
\`\`\`End

\`\`\`Para
CSS comments are written between /* and */. Everything between these markers is treated as a comment and will not be processed by the CSS parser.
\`\`\`End

\`\`\`Code
/* This is a single-line comment */

/* 
This is a multi-line comment 
that can span multiple lines.
*/
\`\`\`End

\`\`\`Bold
Benefits of Using CSS Comments
\`\`\`End

\`\`\`Para
Documentation: Comments help explain the purpose of specific styles or sections of your stylesheet, making it easier for yourself and others to understand the code later.
\`\`\`End

\`\`\`Para
Code Organization: You can use comments to separate different sections of your CSS, improving the overall structure and organization.
\`\`\`End

\`\`\`Para
Debugging: Comments can be used to temporarily disable styles without deleting the code. This is particularly useful when troubleshooting layout issues.
\`\`\`End

\`\`\`Para
Collaboration: In team environments, comments can provide context for other developers, making it easier for them to work with your styles.
\`\`\`End

\`\`\`Bold
Example of CSS Comments in a Stylesheet
\`\`\`End

\`\`\`Code
/* Main Stylesheet for the Website */

/* Reset default browser styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Ensures padding and border are included in width/height */
}

/* Header styles */
header {
    background-color: #333; /* Dark background for header */
    color: white; /* White text color */
    padding: 20px; /* Padding around header */
    text-align: center; /* Center align text */
}

/* Navigation styles */
nav {
    margin: 20px 0; /* Margin above and below the navigation */
}

/* Navigation links */
nav a {
    color: white; /* White text for links */
    text-decoration: none; /* Remove underline from links */
}

/* 
  Note: The following styles for the footer 
  are temporarily disabled for testing purposes.
*/
/*
footer {
    background-color: #222; /* Darker footer background */
    color: #ccc; /* Light grey text */
    padding: 10px; /* Padding around footer */
    text-align: center; /* Center align footer text */
}
*/
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Header Comment: The comment /* Main Stylesheet for the Website */ provides context for the entire stylesheet.
\`\`\`End

\`\`\`Para
Reset Styles: Comments explain the purpose of resetting default browser styles for consistency across browsers.
\`\`\`End

\`\`\`Para
Section Comments: Comments separate sections for clarity, such as /* Header styles */ and /* Navigation styles */.
\`\`\`End

\`\`\`Para
Temporarily Disabled Styles: The comment before the footer styles indicates that those styles are not currently in use, allowing for easy reactivation when needed.
\`\`\`End
`
},

{
title: "CSS",
 content: `
\`\`\`Para
CSS colors are essential for defining the visual appearance of elements on a web page. Colors can be specified in various formats, allowing for flexibility in design. Understanding how to use colors effectively enhances the user experience and contributes to the overall aesthetic of a website.
\`\`\`End

\`\`\`Bold
CSS Color Formats
\`\`\`End

\`\`\`Bold
Named Colors:
\`\`\`End

\`\`\`Para
CSS supports a set of predefined color names (e.g., red, blue, green). This is the simplest way to specify a color.
\`\`\`End

\`\`\`Code
h1 {
    color: red;
}
\`\`\`End

\`\`\`Bold
Hexadecimal Colors:
\`\`\`End

\`\`\`Para
Hex colors are represented by a hash symbol (#) followed by six hexadecimal digits. The first two digits represent red, the next two green, and the last two blue.
\`\`\`End

\`\`\`Code
p {
    color: #ff5733; /* Bright orange */
}
\`\`\`End

\`\`\`Bold
RGB Colors:
\`\`\`End

\`\`\`Para
RGB colors are defined using the rgb() function, which takes three parameters (red, green, blue) with values ranging from 0 to 255.
\`\`\`End

\`\`\`Code
div {
    background-color: rgb(0, 128, 255); /* Bright blue */
}
\`\`\`End

\`\`\`Bold
RGBA Colors:
\`\`\`End

\`\`\`Para
RGBA is similar to RGB but includes an alpha value (opacity) ranging from 0 (fully transparent) to 1 (fully opaque).
\`\`\`End

\`\`\`Code
span {
    color: rgba(255, 0, 0, 0.5); /* Semi-transparent red */
}
\`\`\`End

\`\`\`Bold
HSL Colors:
\`\`\`End

\`\`\`Para
HSL (Hue, Saturation, Lightness) defines colors using three parameters. Hue is specified in degrees (0-360), while saturation and lightness are percentages.
\`\`\`End

\`\`\`Code
h2 {
    color: hsl(120, 100%, 50%); /* Bright green */
}
\`\`\`End

\`\`\`Bold
HSLA Colors:
\`\`\`End

\`\`\`Para
HSLA is like HSL but includes an alpha value for opacity.
\`\`\`End

\`\`\`Code
footer {
    background-color: hsla(240, 100%, 50%, 0.7); /* Semi-transparent blue */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Colors
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Colors Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4; /* Light grey background */
        }
        h1 {
            color: red; /* Named color */
            text-align: center;
        }
        p {
            color: #ff5733; /* Hexadecimal color */
        }
        div {
            background-color: rgb(0, 128, 255); /* RGB color */
            padding: 20px;
            color: white; /* White text color */
        }
        span {
            color: rgba(255, 0, 0, 0.5); /* RGBA color */
        }
        h2 {
            color: hsl(120, 100%, 50%); /* HSL color */
        }
        footer {
            background-color: hsla(240, 100%, 50%, 0.7); /* HSLA color */
            color: white;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>

    <h1>Welcome to My Website</h1>
    <p>This is a paragraph styled with a hexadecimal color.</p>
    
    <div>
        <p>This div has a background color defined in RGB.</p>
    </div>
    
    <h2>Heading with HSL Color</h2>
    
    <p>This text is <span>semi-transparent red</span> using RGBA.</p>
    
    <footer>
        Footer text with a semi-transparent blue background.
    </footer>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Named Color: The <h1> element uses the named color red.
\`\`\`End

\`\`\`Para
Hexadecimal Color: The paragraph uses a bright orange defined by the hex code #ff5733.
\`\`\`End

\`\`\`Para
RGB Color: The div has a bright blue background defined in the RGB format.
\`\`\`End

\`\`\`Para
RGBA Color: The <span> contains semi-transparent red text using the rgba() function.
\`\`\`End

\`\`\`Para
HSL Color: The <h2> element displays a bright green color defined in HSL.
\`\`\`End

\`\`\`Para
HSLA Color: The footer uses a semi-transparent blue background defined by HSLA.
\`\`\`End
`
},

{
title: "CSS Background",
 content: `
\`\`\`Para
CSS backgrounds are essential for enhancing the visual appearance of web elements. You can use backgrounds to add color, images, gradients, and patterns to HTML elements. Understanding how to effectively use CSS background properties allows for more dynamic and engaging designs.
\`\`\`End

\`\`\`Bold
Key CSS Background Properties
\`\`\`End

\`\`\`Bold
background-color:
\`\`\`End

\`\`\`Para
Sets the background color of an element.
\`\`\`End

\`\`\`Code
div {
    background-color: lightblue;
}
\`\`\`End

\`\`\`Bold
background-image:
\`\`\`End

\`\`\`Para
Sets an image as the background of an element. You can also specify multiple images.
\`\`\`End

\`\`\`Code
body {
    background-image: url('background.jpg');
}
\`\`\`End

\`\`\`Bold
background-repeat:
\`\`\`End

\`\`\`Para
Determines whether and how the background image will be repeated.
\`\`\`End

\`\`\`Para
Values: repeat, repeat-x, repeat-y, no-repeat.
\`\`\`End

\`\`\`Code
div {
    background-image: url('pattern.png');
    background-repeat: no-repeat; /* Image will not repeat */
}
\`\`\`End

\`\`\`Bold
background-position:
\`\`\`End

\`\`\`Para
Sets the starting position of the background image.
\`\`\`End

\`\`\`Code
div {
    background-image: url('banner.jpg');
    background-position: center top; /* Image is centered horizontally and aligned at the top */
}
\`\`\`End

\`\`\`Bold
background-size:
\`\`\`End

\`\`\`Para
Specifies the size of the background image. It can be set to values like cover, contain, or specific dimensions.
\`\`\`End


\`\`\`Code
div {
    background-image: url('large-image.jpg');
    background-size: cover; /* Image covers the entire area */
}
\`\`\`End

\`\`\`Bold
background-attachment:
\`\`\`End

\`\`\`Para
Determines how the background image behaves when scrolling. Options include scroll, fixed, and local.
\`\`\`End


\`\`\`Code
body {
    background-image: url('fixed-background.jpg');
    background-attachment: fixed; /* Image stays fixed during scroll */
}
\`\`\`End

\`\`\`Bold
Shorthand Property:
\`\`\`End

\`\`\`Para
You can combine multiple background properties into one shorthand declaration.
\`\`\`End

\`\`\`Code
div {
    background: lightgrey url('image.png') no-repeat center/cover;
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Backgrounds
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Background Example</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background for the body */
        }
        
        header {
            background-image: url('header-background.jpg'); /* Background image for header */
            background-size: cover; /* Cover the entire header area */
            color: white;
            padding: 40px;
            text-align: center;
        }

        .content {
            background-color: white; /* White background for content area */
            padding: 20px;
            margin: 20px; /* Margin around the content */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
        }

        footer {
            background-color: #333; /* Dark background for footer */
            color: white;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>

    <header>
        <h1>Welcome to My Website</h1>
    </header>

    <div class=content>
        <h2>About Us</h2>
        <p>This is a simple example of using CSS backgrounds. The header has a background image, while the content area has a white background.</p>
    </div>

    <footer>
        <p>Footer Information</p>
    </footer>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Body Background: The body has a light grey background color set using background-color.
\`\`\`End

\`\`\`Para
Header Background: The header uses a background image specified with background-image. The background-size: cover property ensures that the image covers the entire header area, maintaining its aspect ratio.
\`\`\`End

\`\`\`Para
Content Area: The content area has a white background (background-color: white), providing contrast with the header and footer.
\`\`\`End

\`\`\`Para
Footer Background: The footer has a dark background color, enhancing readability against white text.
\`\`\`End
`
},

{
title: "CSS Border",
 content: `
\`\`\`Para
CSS borders are a fundamental property used to create visual separation and definition for HTML elements. Borders can enhance the overall design of a webpage by adding structure and style to elements such as divs, images, buttons, and more.
\`\`\`End

\`\`\`Bold
Key CSS Border Properties
\`\`\`End

\`\`\`Bold
border:
\`\`\`End

\`\`\`Para
A shorthand property to set the border width, style, and color in one declaration.
\`\`\`End

\`\`\`Code
div {
    border: 2px solid black; /* 2px wide, solid style, black color */
}
\`\`\`End

\`\`\`Bold
border-width:
\`\`\`End

\`\`\`Para
Specifies the width of the border. It can be set in pixels, ems, or percentages.
\`\`\`End

\`\`\`Code
p {
    border-width: 1px; /* 1 pixel border */
}
\`\`\`End

\`\`\`Bold
border-style:
\`\`\`End

\`\`\`Para
Defines the style of the border. Common styles include none, solid, dashed, dotted, double, groove, ridge, inset, and outset.
\`\`\`End

\`\`\`Code
h1 {
    border-style: dashed; /* Dashed border */
}
\`\`\`End

\`\`\`Bold
border-color:
\`\`\`End

\`\`\`Para
Sets the color of the border. It can be defined using color names, hex codes, RGB, RGBA, HSL, or HSLA.
\`\`\`End

\`\`\`Code
img {
    border-color: red; /* Red border */
}
\`\`\`End

\`\`\`Bold
border-radius:
\`\`\`End

\`\`\`Para
Rounds the corners of an element's border box, creating a softer look.
\`\`\`End

\`\`\`Code
div {
    border-radius: 10px; /* Rounded corners with a radius of 10 pixels */
}
\`\`\`End

\`\`\`Bold
border-image:
\`\`\`End

\`\`\`Para
Allows you to use an image as a border. It can be a more complex property to control how the image is displayed.
\`\`\`End

\`\`\`Code
div {
    border: 5px solid transparent;
    border-image: url('border-image.png') 30 stretch; /* Example of border-image usage */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Borders
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Borders Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
        }
        
        .box {
            border: 3px solid blue; /* Blue solid border */
            padding: 20px; /* Inner spacing */
            margin: 20px; /* Outer spacing */
            border-radius: 15px; /* Rounded corners */
            background-color: white; /* White background for contrast */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow effect */
        }

        .dashed-box {
            border: 2px dashed green; /* Green dashed border */
            padding: 15px;
            margin: 20px;
            border-radius: 10px;
        }

        .rounded-box {
            border: 4px solid red; /* Red solid border */
            padding: 10px;
            margin: 20px;
            border-radius: 50px; /* Very rounded corners */
        }
    </style>
</head>
<body>

    <div class="box">
        <h2>Solid Border Box</h2>
        <p>This box has a solid blue border with rounded corners.</p>
    </div>

    <div class="dashed-box">
        <h2>Dashed Border Box</h2>
        <p>This box features a dashed green border.</p>
    </div>

    <div class="rounded-box">
        <h2>Rounded Border Box</h2>
        <p>This box has a solid red border with very rounded corners.</p>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Solid Border Box: The first box has a solid blue border, padding for inner spacing, and rounded corners achieved using border-radius.
\`\`\`End

\`\`\`Para
Dashed Border Box: The second box features a dashed green border, showcasing how different border styles can be applied.
\`\`\`End

\`\`\`Para
Rounded Border Box: The third box has a solid red border with very rounded corners, demonstrating the versatility of the border-radius property.
\`\`\`End
`
},

{
title: "CSS",
 content: `
\`\`\`Para
CSS margins are used to create space around elements, separating them from other elements on the page. They are crucial for layout control and visual aesthetics, helping to ensure that elements are not too close to one another.
\`\`\`End

\`\`\`Bold
Key Concepts of CSS Margins
\`\`\`End

\`\`\`Bold
Margin Properties:
\`\`\`End

\`\`\`Para
margin: A shorthand property for setting all four margins (top, right, bottom, left) in one declaration.
\`\`\`End

\`\`\`Para
margin-top: Sets the margin space above an element.
\`\`\`End

\`\`\`Para
margin-right: Sets the margin space to the right of an element.
\`\`\`End

\`\`\`Para
margin-bottom: Sets the margin space below an element.
\`\`\`End

\`\`\`Para
margin-left: Sets the margin space to the left of an element.
\`\`\`End

\`\`\`Bold
Auto Margin:
\`\`\`End

\`\`\`Para
Using margin: auto; can be beneficial for centering block elements horizontally within their container, provided the element has a defined width.
\`\`\`End

\`\`\`Code
.centered {
    width: 50%; 
    margin: 0 auto; /* Center the element */
}
\`\`\`End

\`\`\`Bold
Negative Margins:
\`\`\`End

\`\`\`Para
You can use negative values for margins, which allows elements to overlap or pull closer to adjacent elements.
\`\`\`End

\`\`\`Code
.negative-margin {
    margin-top: -10px; /* Pulls the element up by 10 pixels */
}
\`\`\`End

\`\`\`Bold
Margin Collapsing:
\`\`\`End

\`\`\`Para
Margins of adjacent block-level elements may collapse, meaning they may combine into a single margin. This occurs primarily with vertical margins and can affect layout behavior.
\`\`\`End

\`\`\`Bold
Example of Using CSS Margins
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Margins Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
            margin: 0; /* Reset default margin */
        }

        .container {
            max-width: 800px; /* Max width for the container */
            margin: 20px auto; /* Center the container with margin on top and bottom */
            background-color: white; /* White background */
            padding: 20px; /* Inner spacing */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
        }

        h1 {
            margin: 0 0 20px 0; /* No top margin, bottom margin of 20px */
        }

        p {
            margin: 0 0 15px 0; /* No top margin, bottom margin of 15px */
        }

        .button {
            margin-top: 20px; /* Margin above the button */
            padding: 10px 20px; /* Inner spacing for the button */
            background-color: #007BFF; /* Blue background */
            color: white; /* White text */
            border: none; /* No border */
            border-radius: 5px; /* Rounded corners */
            cursor: pointer; /* Pointer cursor on hover */
        }

        .button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is an example of using CSS margins to create spacing around elements.</p>
        <p>Margins help to ensure that text and buttons are not too close to other content.</p>
        <button class="button">Click Me</button>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Container: The .container class centers the content on the page with margin: 20px auto;, which adds a top and bottom margin of 20 pixels and automatically adjusts the left and right margins to center it.
\`\`\`End

\`\`\`Para
Headings and Paragraphs: The <h1> and <p> elements have specific bottom margins to create space between them. For instance, the heading has a bottom margin of 20 pixels, and the paragraphs have a bottom margin of 15 pixels.
\`\`\`End

\`\`\`Para
Button: The button has a top margin of 20 pixels to create space between it and the preceding paragraph.
\`\`\`End
`
},

{
title: "CSS",
 content: `
\`\`\`Para
CSS padding is the space between the content of an element and its border. It is crucial for controlling the inner spacing within elements, which affects the overall layout and readability of a webpage. Padding can help create a more aesthetically pleasing design by ensuring that text and other content do not touch the edges of their containers.
\`\`\`End

\`\`\`Bold
Key Concepts of CSS Padding
\`\`\`End

\`\`\`Bold
Padding Properties:
\`\`\`End

\`\`\`Para
padding: A shorthand property that sets all four padding values (top, right, bottom, left) in one declaration.
\`\`\`End

\`\`\`Para
padding-top: Sets the padding space above the content.
\`\`\`End

\`\`\`Para
padding-right: Sets the padding space to the right of the content.
\`\`\`End

\`\`\`Para
padding-bottom: Sets the padding space below the content.
\`\`\`End

\`\`\`Para
padding-left: Sets the padding space to the left of the content.
\`\`\`End

\`\`\`Bold
Shorthand Usage:
\`\`\`End

\`\`\`Para
You can specify padding values in a single line. For example:
\`\`\`End

\`\`\`Code
padding: 10px 15px; /* 10px top and bottom, 15px left and right */
\`\`\`End

\`\`\`Bold
Padding and Box Model:
\`\`\`End

\`\`\`Para
Padding is part of the CSS box model, which includes margins, borders, and the actual content area. Understanding how padding interacts with these other properties is essential for layout design.
\`\`\`End

\`\`\`Bold
Percentage Values:
\`\`\`End

\`\`\`Para
Padding can be defined using percentage values, which are calculated relative to the width of the containing element.
\`\`\`End

\`\`\`Code
div {
    padding: 5%; /* 5% of the width of the container */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Padding
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Padding Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
            margin: 0; /* Reset default margin */
        }

        .container {
            max-width: 800px; /* Max width for the container */
            margin: 20px auto; /* Center the container with margin on top and bottom */
            background-color: white; /* White background */
            padding: 20px; /* Inner spacing */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
        }

        h1 {
            padding: 10px 0; /* Padding above and below the heading */
            margin: 0; /* Reset default margin */
        }

        p {
            padding: 10px; /* Padding around the paragraph */
            margin: 10px 0; /* Margin above and below the paragraph */
            background-color: #e9ecef; /* Light grey background for contrast */
        }

        .button {
            padding: 10px 20px; /* Padding inside the button */
            background-color: #007BFF; /* Blue background */
            color: white; /* White text */
            border: none; /* No border */
            border-radius: 5px; /* Rounded corners */
            cursor: pointer; /* Pointer cursor on hover */
            margin-top: 20px; /* Margin above the button */
        }

        .button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is an example of using CSS padding to create spacing around elements.</p>
        <p>Padding helps ensure that text does not touch the edges of its container, enhancing readability.</p>
        <button class="button">Click Me</button>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Container: The .container class has padding of 20 pixels, providing space between the content (like text) and the container's border.
\`\`\`End

\`\`\`Para
Headings: The <h1> element has vertical padding (10 pixels above and below), ensuring the heading text is not directly against the top or bottom of the container.
\`\`\`End

\`\`\`Para
Paragraphs: Each <p> element has 10 pixels of padding, providing space inside the paragraph box. Additionally, the paragraphs have a margin of 10 pixels to separate them from each other.
\`\`\`End

\`\`\`Para
Button: The button has padding of 10 pixels vertically and 20 pixels horizontally, creating a comfortable clickable area around the text.
\`\`\`End
`
},

{
title: "CSS Height/Width",
 content: `
\`\`\`Para
CSS height and width properties are fundamental for controlling the size of elements on a webpage. They allow you to define how tall and wide elements will be, contributing to layout and design.
\`\`\`End

\`\`\`Bold
Key Concepts of CSS Height and Width
\`\`\`End

\`\`\`Bold
Setting Height and Width
\`\`\`End

\`\`\`Para
Both properties can be set using various units, including:
\`\`\`End

\`\`\`Para
Pixels (px)
\`\`\`End

\`\`\`Para
Percentages (%)
\`\`\`End

\`\`\`Para
Viewport units (vw, vh)
\`\`\`End

\`\`\`Para
Em and rem units (em, rem)
\`\`\`End

\`\`\`Code
.box {
    width: 300px;  /* Width set in pixels */
    height: 200px; /* Height set in pixels */
}
\`\`\`End

\`\`\`Bold
Auto Values:
\`\`\`End

\`\`\`Para
If not specified, the default value for height is auto, which means the height will adjust based on the content inside the element. For width, auto means the element will take up the space available, constrained by its parent container.
\`\`\`End

\`\`\`Code
.container {
    width: auto; /* Takes up the width of its parent */
}
\`\`\`End

\`\`\`Bold
Percentage Values:
\`\`\`End

\`\`\`Para
Setting height and width in percentages makes the element responsive to its parent’s size. For example, a width of 50% means the element will take up half of its parent’s width.
\`\`\`End

\`\`\`Code
.responsive {
    width: 50%; /* 50% of the parent element's width */
}
\`\`\`End

\`\`\`Bold
Min and Max Properties:
\`\`\`End

\`\`\`Para
You can use min-height, max-height, min-width, and max-width to control the limits of an element's size.
\`\`\`End

\`\`\`Code
.box {
    min-height: 100px; /* Minimum height */
    max-width: 500px;  /* Maximum width */
}
\`\`\`End

\`\`\`Bold
Box Model Considerations:
\`\`\`End

\`\`\`Para
The width and height properties apply to the content area of an element. If the box model is set to box-sizing: border-box;, the padding and border are included in the specified width and height.
\`\`\`End

\`\`\`Code
.box {
    box-sizing: border-box; /* Includes padding and border in width and height */
    width: 300px; 
    height: 200px; 
    padding: 20px; 
    border: 5px solid black; 
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Height and Width
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Height and Width Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
            margin: 0; /* Reset default margin */
        }

        .container {
            max-width: 800px; /* Max width for the container */
            margin: 20px auto; /* Center the container */
            padding: 20px; /* Inner spacing */
            background-color: white; /* White background */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        .box {
            width: 300px;   /* Fixed width */
            height: 150px;  /* Fixed height */
            background-color: #007BFF; /* Blue background */
            color: white; /* White text */
            display: flex; /* Use flexbox for centering */
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            margin: 10px auto; /* Center the box with margin */
        }

        .responsive-box {
            width: 80%; /* Responsive width */
            height: 200px; /* Fixed height */
            background-color: #28a745; /* Green background */
            margin: 10px auto; /* Center the box with margin */
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>CSS Height and Width Example</h1>
        
        <div class="box">
            Fixed Size Box
        </div>
        
        <div class="responsive-box">
            Responsive Width Box
        </div>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Para
Explanation of the Example
\`\`\`End

\`\`\`Para
Container: The .container class is used to center content with a maximum width of 800 pixels, providing padding and a white background.
\`\`\`End

\`\`\`Para
Fixed Size Box: The .box class has a fixed width of 300 pixels and a height of 150 pixels. The background color is blue, and the text is centered using flexbox properties.
\`\`\`End

\`\`\`Para
Responsive Width Box: The .responsive-box class has a width set to 80% of its parent container, making it responsive. It has a fixed height of 200 pixels.
\`\`\`End	
`
},

{
title: "CSS Box Model",
 content: `
\`\`\`Para
The CSS box model is a fundamental concept that describes how elements on a web page are structured and how their dimensions are calculated. Understanding the box model is crucial for effective layout design and spacing control.
\`\`\`End

\`\`\`Bold
Components of the Box Model
\`\`\`End

\`\`\`Para
Content: This is the actual content of the box, such as text, images, or other elements. The dimensions of the content area can be controlled using the width and height properties.
\`\`\`End

\`\`\`Para
Padding: Padding is the space between the content and the border. It creates an inner space around the content. You can set padding for all sides (top, right, bottom, left) using the padding property.
\`\`\`End

\`\`\`Para
Example: padding: 20px; adds 20 pixels of padding on all sides.
\`\`\`End

\`\`\`Para
Border: The border wraps around the padding (if any) and the content. You can control the border's width, style, and color using the border property.
\`\`\`End

\`\`\`Para
Example: border: 2px solid black; creates a solid black border that is 2 pixels thick.
\`\`\`End

\`\`\`Para
Margin: Margin is the outer space around the box, separating it from other elements. Margins can also be set for all sides using the margin property.
\`\`\`End

\`\`\`Para
Example: margin: 10px; adds 10 pixels of space outside the box on all sides.
\`\`\`End

\`\`\`Bold
Box Model Calculation
\`\`\`End

\`\`\`Para
The total width and height of an element can be calculated as follows:
\`\`\`End

\`\`\`Para
Total Width: width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
\`\`\`End

\`\`\`Para
Total Height: height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
\`\`\`End

\`\`\`Bold
Box-Sizing Property
\`\`\`End

\`\`\`Para
By default, the width and height properties in CSS apply to the content area only. However, the box-sizing property can change this behavior:
\`\`\`End

\`\`\`Para
box-sizing: content-box;: This is the default. Width and height only apply to the content.
\`\`\`End

\`\`\`Para
box-sizing: border-box;: The width and height include padding and border, which simplifies layout calculations.
\`\`\`End

\`\`\`Bold
Example of the CSS Box Model
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Box Model Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
            margin: 0; /* Reset default margin */
        }

        .box {
            width: 300px; /* Content width */
            height: 150px; /* Content height */
            padding: 20px; /* Padding around content */
            border: 5px solid blue; /* Blue border */
            margin: 20px; /* Margin around the box */
            box-sizing: border-box; /* Include padding and border in width and height */
            background-color: white; /* White background */
            text-align: center; /* Center the text */
        }
    </style>
</head>
<body>

    <div class="box">
        This is a box model example.
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Box Properties:
\`\`\`End

\`\`\`Para
The .box class has a width of 300 pixels and a height of 150 pixels for the content area.
\`\`\`End

\`\`\`Para
It has 20px of padding, which adds space around the content inside the box.
\`\`\`End

\`\`\`Para
The border is 5px solid blue, wrapping around the padding and content.
\`\`\`End

\`\`\`Para
A 20px margin is applied, creating space outside the box, separating it from other elements.
\`\`\`End

\`\`\`Para
Box-Sizing:
\`\`\`End

\`\`\`Para
By using box-sizing: border-box;, the total width of the box becomes 300px, which includes the padding and border. Therefore, the total height will also remain 150px regardless of padding and border.
\`\`\`End
`
},

{
title: "CSS",
 content: `
\`\`\`Para
CSS outlines are a way to create a line around an element that is similar to borders but with some key differences. Outlines are primarily used for accessibility and visual emphasis, helping to highlight elements without affecting the layout.
\`\`\`End

\`\`\`Bold
Key Features of CSS Outlines
\`\`\`End

\`\`\`Para
Properties:
\`\`\`End

\`\`\`Para
outline: A shorthand property for setting the outline width, style, and color in one declaration.
\`\`\`End

\`\`\`Para
outline-width: Specifies the thickness of the outline. Common values are in pixels (e.g., 2px, 3px).
\`\`\`End

\`\`\`Para
outline-style: Defines the style of the outline. Common styles include none, solid, dashed, dotted, and double.
\`\`\`End

\`\`\`Para
outline-color: Sets the color of the outline, similar to how you would set border colors.
\`\`\`End

\`\`\`Bold
Non-Impacting Layout:
\`\`\`End

\`\`\`Para
Unlike borders, outlines do not take up space in the box model. This means they do not affect the positioning or dimensions of surrounding elements. The outline is drawn outside the border of the element.
\`\`\`End

\`\`\`Bold
No Corner Radius:
\`\`\`End

\`\`\`Para
Outlines do not support rounded corners; they will always be rectangular, even if the element has a border-radius.
\`\`\`End

\`\`\`Bold
Accessibility:
\`\`\`End

\`\`\`Para
Outlines are often used to improve accessibility, especially for focus states of interactive elements like links and buttons. They provide a visual cue for keyboard navigation.
\`\`\`End

\`\`\`Bold
Example of Using CSS Outlines
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Outline Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light grey background */
            margin: 0; /* Reset default margin */
        }

        .box {
            width: 300px; /* Fixed width */
            height: 150px; /* Fixed height */
            padding: 20px; /* Inner spacing */
            border: 2px solid #007BFF; /* Blue border */
            outline: 4px dashed red; /* Red dashed outline */
            margin: 20px; /* Margin around the box */
            background-color: white; /* White background */
            text-align: center; /* Center the text */
        }

        .focusable {
            padding: 10px;
            margin: 20px;
            border: 2px solid #28a745; /* Green border */
            outline: none; /* Remove outline by default */
            transition: outline 0.2s; /* Smooth transition for outline */
        }

        .focusable:focus {
            outline: 3px solid orange; /* Orange outline when focused */
        }
    </style>
</head>
<body>

    <div class="box">
        This is a box with an outline.
    </div>

    <button class="focusable" tabindex="0">Focus on Me</button>

</body>
</html>
\`\`\`End

\`\`\`Para
Explanation of the Example
\`\`\`End

\`\`\`Para
Box with Outline:
\`\`\`End

\`\`\`Para
The .box class has a fixed width and height, with a blue border and a red dashed outline. The outline adds emphasis around the box without affecting its layout.
\`\`\`End

\`\`\`Para
Focusable Element:
\`\`\`End

\`\`\`Para
The button with the class .focusable initially has no outline. When it receives focus (e.g., by tabbing to it), an orange outline appears, providing a visual cue for accessibility.
\`\`\`End

\`\`\`Para
Styling:
\`\`\`End

\`\`\`Para
The outline property is set with a dashed style for the box, and when the button is focused, it displays an orange outline. The transition property provides a smooth effect when the outline appears or disappears.
\`\`\`End
`
},

{
title: "CSS Text",
 content: `
\`\`\`Para
CSS text properties are essential for controlling the appearance and formatting of text on a webpage. These properties allow you to adjust various aspects of text, including its size, color, alignment, spacing, and decoration. Understanding how to use these properties effectively can significantly enhance the readability and aesthetics of your content.
\`\`\`End

\`\`\`Bold
Key CSS Text Properties
\`\`\`End

\`\`\`Bold
Text Color:
\`\`\`End

\`\`\`Para
color: Sets the color of the text.
\`\`\`End

\`\`\`Code
p {
    color: blue; /* Text color set to blue */
}
\`\`\`End

\`\`\`Bold
Font Size:
\`\`\`End

\`\`\`Para
font-size: Specifies the size of the text.
\`\`\`End

\`\`\`Code
h1 {
    font-size: 24px; /* Font size set to 24 pixels */
}
\`\`\`End

\`\`\`Bold
Font Family:
\`\`\`End

\`\`\`Para
font-family: Defines the typeface used for the text. You can specify multiple fonts as fallbacks.
\`\`\`End

\`\`\`Code
body {
    font-family: Arial, sans-serif; /* Primary font is Arial, with sans-serif as a fallback */
}
\`\`\`End

\`\`\`Bold
Text Alignment:
\`\`\`End

\`\`\`Para
text-align: Aligns the text within its container. Common values include left, right, center, and justify.
\`\`\`End

\`\`\`Code
h2 {
    text-align: center; /* Center-align the text */
}
\`\`\`End

\`\`\`Bold
Text Decoration:
\`\`\`End

\`\`\`Para
text-decoration: Applies decorations such as underline, overline, or strikethrough.
\`\`\`End

\`\`\`Code
a {
    text-decoration: none; /* Removes underline from links */
}
\`\`\`End

\`\`\`Bold
Line Height:
\`\`\`End

\`\`\`Para
line-height: Controls the spacing between lines of text, which can improve readability.
\`\`\`End

\`\`\`Code
p {
    line-height: 1.5; /* 1.5 times the font size */
}
\`\`\`End

\`\`\`Bold
Letter Spacing:
\`\`\`End

\`\`\`Para
letter-spacing: Adjusts the space between individual letters.
\`\`\`End

\`\`\`Code
h1 {
    letter-spacing: 1px; /* Adds 1 pixel of space between letters */
}
\`\`\`End

\`\`\`Bold
Text Transform:
\`\`\`End

\`\`\`Para
text-transform: Controls the capitalization of text. Options include uppercase, lowercase, and capitalize.
\`\`\`End

\`\`\`Code
h3 {
    text-transform: uppercase; /* Converts text to uppercase */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Text Properties
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Text Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            margin: 0; /* Reset default margin */
            padding: 20px; /* Padding for the body */
        }

        h1 {
            font-size: 36px; /* Font size for the main heading */
            color: #333; /* Dark grey text color */
            text-align: center; /* Center the heading */
            letter-spacing: 1px; /* Slightly increase space between letters */
        }

        p {
            font-size: 16px; /* Font size for paragraphs */
            color: #555; /* Medium grey text color */
            line-height: 1.5; /* Line height for better readability */
            margin: 15px 0; /* Margin above and below paragraphs */
        }

        a {
            color: #007BFF; /* Blue color for links */
            text-decoration: underline; /* Underline links */
        }

        a:hover {
            text-decoration: none; /* Remove underline on hover */
        }

        .highlight {
            background-color: yellow; /* Highlight text with a yellow background */
            padding: 2px; /* Small padding around highlighted text */
        }
    </style>
</head>
<body>

    <h1>Welcome to My Website</h1>
    <p>This is an example of using CSS to style text properties.</p>
    <p>Hover over this <a href="#" class="highlight">link</a> to see the effect!</p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Body: The body is styled with a specific font family (Arial) and light background color, with some padding for space.
\`\`\`End

\`\`\`Para
Headings: The <h1> element is styled with a larger font size, dark grey color, center alignment, and increased letter spacing for emphasis.
\`\`\`End

\`\`\`Para
Paragraphs: The <p> elements have a medium grey color, a standard font size, and a line height of 1.5 for improved readability. Margins are added to space them apart.
\`\`\`End

\`\`\`Para
Links: The <a> elements are styled with a specific color and underline. The underline is removed on hover for a visual effect.
\`\`\`End

\`\`\`Para
Highlighting: The .highlight class applies a yellow background color to emphasize specific text, with small padding for spacing.
\`\`\`End
`
},

{
title: "CSS Fonts",
 content: `
\`\`\`Para
CSS fonts are essential for defining the typography of a webpage. They determine the appearance of text, influencing both aesthetics and readability. Understanding how to use font properties effectively can significantly enhance the design of your site.
\`\`\`End

\`\`\`Bold
Key CSS Font Properties
\`\`\`End

\`\`\`Bold
Font Family:
\`\`\`End

\`\`\`Para
font-family: Specifies the typeface to be used for the text. You can define a list of fonts as fallbacks.
\`\`\`End

\`\`\`Code
body {
    font-family: 'Arial', sans-serif; /* Fallback to sans-serif if Arial is unavailable */
}
\`\`\`End

\`\`\`Bold
Font Size:
\`\`\`End

\`\`\`Para
font-size: Sets the size of the font. It can be specified in various units, including pixels (px), ems (em), rems (rem), and percentages (%).
\`\`\`End

\`\`\`Code
h1 {
    font-size: 36px; /* Size of 36 pixels */
}
\`\`\`End

\`\`\`Bold
Font Weight:
\`\`\`End

\`\`\`Para
font-weight: Controls the thickness of the text. Common values include normal, bold, bolder, lighter, or numeric values like 400 (normal) and 700 (bold).
\`\`\`End

\`\`\`Code
p {
    font-weight: bold; /* Makes the text bold */
}
\`\`\`End

\`\`\`Bold
Font Style:
\`\`\`End

\`\`\`End
font-style: Used to specify the style of the font, such as normal, italic, or oblique.
\`\`\`End

\`\`\`Code
em {
    font-style: italic; /* Italicizes text */
}
\`\`\`End

\`\`\`Bold
Line Height:
\`\`\`End

\`\`\`Para
line-height: Sets the amount of space between lines of text, which can improve readability.
\`\`\`End

\`\`\`Code
p {
    line-height: 1.5; /* 1.5 times the font size */
}
\`\`\`End

\`\`\`Bold
Text Transform:
\`\`\`End

\`\`\`Para
text-transform: Changes the case of the text. Options include uppercase, lowercase, and capitalize.
\`\`\`End

\`\`\`Code
h2 {
    text-transform: uppercase; /* Converts text to uppercase */
}
\`\`\`End

\`\`\`Bold
Font Variants:
\`\`\`End

\`\`\`Para
font-variant: Controls the usage of small caps for text.
\`\`\`End

\`\`\`Code
p {
    font-variant: small-caps; /* Displays text in small caps */
}
\`\`\`End

\`\`\`Bold
Web Fonts
\`\`\`End

\`\`\`Para
Google Fonts: A popular resource that provides a wide variety of free fonts. You can include them in your project using a <link> tag in your HTML.
\`\`\`End

\`\`\`Code
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
\`\`\`End

\`\`\`Para
@font-face: This rule allows you to load custom fonts from your server.
\`\`\`End

\`\`\`Code
@font-face {
    font-family: 'MyCustomFont';
    src: url('MyCustomFont.woff2') format('woff2');
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Fonts
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Fonts Example</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif; /* Use Google Font Roboto */
            background-color: #f9f9f9; /* Light background color */
            margin: 0; /* Reset default margin */
            padding: 20px; /* Padding for the body */
        }

        h1 {
            font-size: 36px; /* Font size for the main heading */
            font-weight: 700; /* Bold weight */
            color: #333; /* Dark grey text color */
            text-align: center; /* Center the heading */
        }

        p {
            font-size: 16px; /* Font size for paragraphs */
            color: #555; /* Medium grey text color */
            line-height: 1.5; /* Line height for better readability */
            margin: 15px 0; /* Margin above and below paragraphs */
        }

        .highlight {
            font-weight: bold; /* Bold for highlighted text */
            text-transform: uppercase; /* Uppercase letters */
            color: #007BFF; /* Blue color for emphasis */
        }
    </style>
</head>
<body>

    <h1>Welcome to My Stylish Website</h1>
    <p>This is an example of using CSS to style fonts.</p>
    <p>Pay attention to the <span class="highlight">highlighted text</span> that shows different font styles!</p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Para
Google Font: The <link> tag includes the Roboto font from Google Fonts, allowing you to use it in your CSS.
\`\`\`End

\`\`\`Para
Body Styles: The body is styled with the Roboto font, light background color, and padding for spacing.
\`\`\`End

\`\`\`Para
Headings: The <h1> element has a larger font size, bold weight, and dark grey color, center-aligned for emphasis.
\`\`\`End

\`\`\`Para
Paragraphs: The <p> elements have a medium grey color, standard font size, and a line height of 1.5 for improved readability.
\`\`\`End

\`\`\`Para
Highlighted Text: The .highlight class is used to style specific text with bold weight, uppercase transformation, and blue color.
\`\`\`End
`
},

{
title: "CSS Icons",
 content: `
\`\`\`Para
CSS icons are graphical representations used to enhance user interfaces, often serving as visual indicators or buttons for actions. They can be created using various methods, including image files, font icons, or CSS-only techniques. Understanding how to implement and style icons effectively can significantly improve the usability and aesthetics of a webpage.
\`\`\`End

\`\`\`Bold
Methods for Using Icons in CSS
\`\`\`End

\`\`\`Bold
Image Icons:
\`\`\`End

\`\`\`Para
You can use standard image formats (like PNG, SVG, or GIF) for icons. This method is straightforward but may require multiple image files for different states (hover, active, etc.).
\`\`\`End

\`\`\`Code
.icon {
    background-image: url('icon.png');
    width: 24px; /* Set the width */
    height: 24px; /* Set the height */
    display: inline-block; /* Make it behave like an inline element */
}
\`\`\`End

\`\`\`Bold
Font Icons:
\`\`\`End

\`\`\`Para
Icon fonts are collections of icons that can be styled with CSS like text. Font Awesome and Material Icons are popular libraries that provide scalable icons.
\`\`\`End

\`\`\`Code
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
\`\`\`End

\`\`\`Code
.fa {
    font-size: 24px; /* Set the size */
    color: #007BFF; /* Set the color */
}
\`\`\`End

\`\`\`Code
<i class="fas fa-camera"></i> <!-- Example icon -->
\`\`\`End

\`\`\`Bold
SVG Icons:
\`\`\`End

\`\`\`Para
Scalable Vector Graphics (SVG) can be used for icons and are resolution-independent, making them great for responsive design. SVGs can be embedded directly in HTML or referenced as external files.
\`\`\`End

\`\`\`Code
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
</svg>
\`\`\`End

\`\`\`Bold
CSS-only Icons:
\`\`\`End

\`\`\`Para
You can create simple icons using CSS shapes and properties. This method is suitable for basic icons.
\`\`\`End

\`\`\`Code
.circle {
    width: 50px;
    height: 50px;
    background-color: #007BFF;
    border-radius: 50%; /* Make it a circle */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Icons
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Icons Example</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .icon {
            font-size: 24px; /* Size for font icons */
            color: #007BFF; /* Color for icons */
            margin-right: 10px; /* Space between icons and text */
            vertical-align: middle; /* Aligns the icon with text */
        }

        .image-icon {
            width: 24px; /* Size for image icons */
            height: 24px; /* Size for image icons */
            display: inline-block; /* Make it behave like an inline element */
            background-image: url('icon.png'); /* Replace with your image URL */
            background-size: cover; /* Scale the image */
            margin-right: 10px; /* Space between icons and text */
        }

        h2 {
            margin-top: 20px; /* Margin for headings */
        }
    </style>
</head>
<body>

    <h1>Using Icons in CSS</h1>
    <h2>Font Awesome Icons:</h2>
    <p>
        <i class="fas fa-camera icon"></i>Camera Icon
        <i class="fas fa-heart icon"></i>Heart Icon
        <i class="fas fa-cog icon"></i>Settings Icon
    </p>

    <h2>Image Icons:</h2>
    <p>
        <span class="image-icon"></span>Image Icon Example
    </p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Font Icons:
\`\`\`End

\`\`\`Para
The example uses Font Awesome for icons. The <link> tag includes the Font Awesome stylesheet, allowing the use of its icons with the <i> tag and appropriate classes.
\`\`\`End

\`\`\`Bold
Image Icons:
\`\`\`End

\`\`\`Para
An image icon is created using a span with a background image. You can replace icon.png with the actual path to your image file. The background-size: cover; ensures the icon fits within the specified width and height.
\`\`\`End

\`\`\`Bold
Styling:
\`\`\`End

\`\`\`Para
The styles define sizes, colors, and spacing for both font and image icons to ensure they display nicely within the text.
\`\`\`End
`
},

{
title: "CSS Links",
 content: `
\`\`\`Para
CSS links are essential for styling anchor elements (<a> tags) on a webpage, allowing you to control their appearance and behavior. Links can be styled in various ways to enhance usability and improve the visual design of your website.
\`\`\`End

\`\`\`Bold
Key CSS Properties for Links
\`\`\`End

\`\`\`Bold
Color:
\`\`\`End

\`\`\`Para
color: Sets the text color of the link.
\`\`\`End

\`\`\`Code
a {
    color: blue; /* Sets the link color to blue */
}
\`\`\`End

\`\`\`Bold
Text Decoration:
\`\`\`End

\`\`\`Para
text-decoration: Controls the decoration of the link. Common values include none (to remove underlines), underline, overline, or line-through.
\`\`\`End

\`\`\`Code
a {
    text-decoration: none; /* Removes the underline from links */
}
\`\`\`End

\`\`\`Bold
Hover Effects:
\`\`\`End

\`\`\`Para
You can change the appearance of links when the user hovers over them using the :hover pseudo-class.
\`\`\`End

\`\`\`Code
a:hover {
    color: darkblue; /* Changes link color on hover */
    text-decoration: underline; /* Adds an underline on hover */
}
\`\`\`End

\`\`\`Bold
Visited Links:
\`\`\`End

\`\`\`Para
The :visited pseudo-class allows you to style links that the user has already visited.
\`\`\`End

\`\`\`Code
a:visited {
    color: purple; /* Sets the color for visited links */
}
\`\`\`End

\`\`\`Bold
Active Links:
\`\`\`End

\`\`\`Para
The :active pseudo-class styles links when they are being clicked.
\`\`\`End

\`\`\`Code
a:active {
    color: red; /* Changes color when the link is clicked */
}
\`\`\`End

\`\`\`Bold
Font Styles:
\`\`\`End

\`\`\`Para
You can also apply font styles to links, such as font-weight or font-style.
\`\`\`End

\`\`\`Code
a {
    font-weight: bold; /* Makes link text bold */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Links
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Links Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            margin: 0; /* Reset default margin */
            padding: 20px; /* Padding for the body */
        }

        a {
            color: #007BFF; /* Default link color */
            text-decoration: none; /* Remove underline from links */
            font-weight: bold; /* Bold links */
        }

        a:hover {
            color: #0056b3; /* Darker blue on hover */
            text-decoration: underline; /* Underline on hover */
        }

        a:visited {
            color: purple; /* Color for visited links */
        }

        a:active {
            color: red; /* Color when the link is being clicked */
        }
    </style>
</head>
<body>

    <h1>Styling Links with CSS</h1>
    <p>
        Visit <a href="https://www.example.com">Example Website</a> to learn more.
    </p>
    <p>
        You can also check out <a href="https://www.openai.com">OpenAI</a> for more information.
    </p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Link Styles:
\`\`\`End

\`\`\`Para
The default styles for links are set to a specific color (#007BFF), no text decoration, and bold font weight.
\`\`\`End

\`\`\`Bold
Hover Effects:
\`\`\`End

\`\`\`Para
When a user hovers over a link, the color changes to a darker blue (#0056b3), and an underline appears.
\`\`\`End

\`\`\`Bold
Visited Links:
\`\`\`End

\`\`\`Para
Links that the user has visited will be displayed in purple.
\`\`\`End

\`\`\`Bold
Active Links:
\`\`\`End

\`\`\`Para
When a link is clicked, its color changes to red, providing immediate feedback to the user.
\`\`\`End

\`\`\`Bold
Content:
\`\`\`End

\`\`\`Para
The example includes two links pointing to example websites, demonstrating how the styles apply to actual content.
\`\`\`End
`
},

{
title: "CSS Lists",
 content: `
\`\`\`Para
CSS lists are used to style HTML lists, which can be either ordered (<ol>) or unordered (<ul>). Lists are essential for organizing content in a clear and structured way, and CSS allows you to customize their appearance, including the bullet style, spacing, and overall layout.
\`\`\`End

\`\`\`Bold
Types of Lists
\`\`\`End

\`\`\`Bold
Unordered Lists (<ul>):
\`\`\`End

\`\`\`Para
Displays items with bullet points. The default bullet is typically a solid circle.

\`\`\`Code
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
\`\`\`End

\`\`\`Bold
Ordered Lists (<ol>):
\`\`\`End

\`\`\`Para
Displays items in a numbered format. The default numbering starts at 1.
\`\`\`End

\`\`\`Code
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
\`\`\`End

\`\`\`Bold
CSS Properties for Styling Lists
\`\`\`End

\`\`\`Bold
List Style Type:
\`\`\`End

\`\`\`Para
list-style-type: Changes the appearance of the bullets or numbers. Common values include disc, circle, square, decimal, upper-alpha, and none.
\`\`\`End

\`\`\`Code
ul {
    list-style-type: square; /* Changes bullets to squares */
}
\`\`\`End

\`\`\`Bold
List Style Position:
\`\`\`End

\`\`\`Para
list-style-position: Controls the placement of the bullet points. Values can be inside (bullets inside the list item box) or outside (default).
\`\`\`End

\`\`\`Code
ul {
    list-style-position: inside; /* Places bullets inside the list item */
}
\`\`\`End

\`\`\`Bold
Margin and Padding:
\`\`\`End

\`\`\`Para
Adjusts the spacing around and within the list. This is useful for aligning lists with other content.
\`\`\`End

\`\`\`Code
ul {
    margin: 20px; /* Space outside the list */
    padding: 10px; /* Space inside the list */
}
\`\`\`End

\`\`\`Bold
Custom Bullets:
\`\`\`End

\`\`\`Para
You can use images as list item markers using the list-style-image property.
\`\`\`End

\`\`\`Code
ul {
    list-style-image: url('bullet.png'); /* Use an image for bullets */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Lists
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Lists Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            margin: 0; /* Reset default margin */
            padding: 20px; /* Padding for the body */
        }

        ul {
            list-style-type: square; /* Square bullets for unordered lists */
            margin: 20px; /* Space outside the list */
            padding: 10px; /* Space inside the list */
        }

        ol {
            list-style-type: upper-alpha; /* Uppercase letters for ordered lists */
            margin: 20px; /* Space outside the list */
            padding: 10px; /* Space inside the list */
        }

        li {
            margin: 5px 0; /* Space between list items */
        }
    </style>
</head>
<body>

    <h1>Styling Lists with CSS</h1>
    
    <h2>Unordered List:</h2>
    <ul>
        <li>Item A</li>
        <li>Item B</li>
        <li>Item C</li>
    </ul>

    <h2>Ordered List:</h2>
    <ol>
        <li>First Step</li>
        <li>Second Step</li>
        <li>Third Step</li>
    </ol>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Body Styles:
\`\`\`End

\`\`\`Para
The body is styled with a specific font and light background color, along with padding for space.
\`\`\`End

\`\`\`Bold
Unordered List:
\`\`\`End

\`\`\`Para
The unordered list uses square bullets, with specified margins and padding to improve spacing.
\`\`\`End

\`\`\`Bold
Ordered List:
\`\`\`End

\`\`\`Para
The ordered list uses uppercase letters for numbering, along with the same margin and padding styles.
\`\`\`End

\`\`\`Bold
List Item Margin:
\`\`\`End

\`\`\`Para
Each list item (<li>) has a small margin to provide space between items, improving readability.
\`\`\`End
`
},

{
title: "CSS Tables",
 content: `
\`\`\`Para
CSS tables are used to style HTML table elements, which present data in a structured format. Tables are particularly useful for displaying tabular data, such as schedules, comparisons, or statistics. By using CSS, you can customize the appearance of tables, making them more visually appealing and easier to read.
\`\`\`End

\`\`\`Bold
HTML Table Structure
\`\`\`End

\`\`\`Para
An HTML table consists of several elements:
\`\`\`End

\`\`\`Para
<table>: The main container for the table.
\`\`\`End

\`\`\`Para
<tr>: Defines a table row.
\`\`\`End

\`\`\`Para
<th>: Defines a table header cell, typically bold and centered by default.
\`\`\`End

\`\`\`Para
<td>: Defines a table data cell.
\`\`\`End

\`\`\`Bold
Basic Table Example
\`\`\`End

\`\`\`Code
<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
    </tr>
    <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
    </tr>
    <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
    </tr>
</table>
\`\`\`End

\`\`\`Bold
CSS Properties for Styling Tables
\`\`\`End

\`\`\`Bold
Border:
\`\`\`End

\`\`\`Para
Use the border property to add borders to the table, rows, headers, and cells.
\`\`\`End

\`\`\`Code
table {
    border-collapse: collapse; /* Collapse borders into a single border */
}

th, td {
    border: 1px solid #ddd; /* Light grey border for cells */
}
\`\`\`End

\`\`\`Bold
Padding:
\`\`\`End

\`\`\`Para
Add padding to table cells for better spacing of content.
\`\`\`End

\`\`\`Code
th, td {
    padding: 10px; /* Padding inside cells */
}
\`\`\`End

\`\`\`Bold
Text Alignment:
\`\`\`End

\`\`\`Para
Control text alignment within cells using text-align.
\`\`\`End

\`\`\`Code

th {
    text-align: left; /* Align header text to the left */
}

td {
    text-align: center; /* Center align data cells */
}
\`\`\`End

\`\`\`Bold
Background Color:
\`\`\`End

\`\`\`Para
Set background colors for the table, rows, or cells to enhance readability.
\`\`\`End

\`\`\`Code
th {
    background-color: #f2f2f2; /* Light grey background for headers */
}

tr:nth-child(even) {
    background-color: #f9f9f9; /* Zebra striping for even rows */
}
\`\`\`End

\`\`\`Bold
Hover Effects:
\`\`\`End

\`\`\`Para
You can add hover effects to improve user experience.
\`\`\`End

\`\`\`Code
tr:hover {
    background-color: #f1f1f1; /* Change background color on row hover */
}
\`\`\`End

\`\`\`Bold
Example of Using CSS Tables
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Tables Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        table {
            border-collapse: collapse; /* Collapse borders */
            width: 100%; /* Full width */
            margin-top: 20px; /* Space above the table */
        }

        th, td {
            border: 1px solid #ddd; /* Light grey border */
            padding: 10px; /* Padding inside cells */
            text-align: left; /* Align header text to the left */
        }

        th {
            background-color: #f2f2f2; /* Light grey background for headers */
        }

        tr:nth-child(even) {
            background-color: #f9f9f9; /* Zebra striping for even rows */
        }

        tr:hover {
            background-color: #f1f1f1; /* Change background color on row hover */
        }
    </style>
</head>
<body>

    <h1>Styling Tables with CSS</h1>
    <table>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>Apple</td>
            <td>$1.00</td>
            <td>50</td>
        </tr>
        <tr>
            <td>Banana</td>
            <td>$0.50</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Cherry</td>
            <td>$3.00</td>
            <td>30</td>
        </tr>
    </table>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Table Structure:
\`\`\`End

\`\`\`Para
The table consists of a header row (<th>) and several data rows (<td>).
\`\`\`End

\`\`\`Bold
CSS Styles:
\`\`\`End

\`\`\`Para
The border-collapse property ensures that table borders are combined into a single border, avoiding double borders.
\`\`\`End

\`\`\`Para
Padding is added to table cells to create space around the text, enhancing readability.
\`\`\`End

\`\`\`Para
Background colors are set for header cells and even rows for visual clarity.
\`\`\`End

\`\`\`Para
The hover effect changes the background color of rows when a user hovers over them, providing interactivity.
\`\`\`End

\`\`\`Bold
Overall Layout:
\`\`\`End

\`\`\`Para
The table is responsive and styled to be full-width, making it adaptable to different screen sizes.
\`\`\`End
`
},

{
title: "CSS Display",
 content: `
\`\`\`Para
The CSS display property is fundamental in controlling how elements are rendered on the webpage. It determines the layout behavior of an element and affects its box model characteristics, positioning, and overall interaction with surrounding elements.
\`\`\`End

\`\`\`Bold
Common Values of the display Property
\`\`\`End

\`\`\`Bold
block:
\`\`\`End

\`\`\`Para
The element takes up the full width available and starts on a new line. Block elements can contain other block or inline elements.
\`\`\`End

\`\`\`Para
Examples: <div>, <p>, <h1>, <section>
\`\`\`End

\`\`\`Code
.block {
    display: block; /* Element behaves as a block */
}
\`\`\`End

\`\`\`Bold
inline:
\`\`\`End

\`\`\`Para
The element only takes up as much width as necessary and does not start on a new line. Inline elements can be placed within block elements.
\`\`\`End

\`\`\`Para
Examples: <span>, <a>, <strong>
\`\`\`End

\`\`\`Code
.inline {
    display: inline; /* Element behaves as an inline element */
}
\`\`\`End

\`\`\`Bold
inline-block:
\`\`\`End

\`\`\`Para
The element is formatted like an inline element, but it allows for width and height settings. It does not start on a new line but behaves like a block element in terms of box model properties.
\`\`\`End

\`\`\`Code
.inline-block {
    display: inline-block; /* Element can have width and height */
}
\`\`\`End

\`\`\`Bold
none:
\`\`\`End

\`\`\`Para
The element is not displayed at all (it takes up no space). This is often used for hiding elements via JavaScript or CSS.
\`\`\`End

\`\`\`Code
.hidden {
    display: none; /* Element is hidden */
}
\`\`\`End

\`\`\`Bold
flex:
\`\`\`End

\`\`\`Para
Defines a flex container, allowing for flexible layout of its children. This is part of the Flexbox layout model.
\`\`\`End

\`\`\`Code
.flex-container {
    display: flex; /* Enables flexbox layout */
}
\`\`\`End

\`\`\`Bold
grid:
\`\`\`End

\`\`\`Para
Defines a grid container for layout using CSS Grid. This allows for complex two-dimensional layouts.
\`\`\`End

\`\`\`Code
.grid-container {
    display: grid; /* Enables grid layout */
}
\`\`\`End

\`\`\`Bold
Example of Using the display Property
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Display Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .block {
            display: block;
            background-color: #e0f7fa; /* Light blue background */
            padding: 10px;
            margin-bottom: 10px; /* Space between block elements */
        }

        .inline {
            display: inline;
            background-color: #ffe082; /* Light yellow background */
            padding: 5px;
            margin-right: 5px; /* Space between inline elements */
        }

        .inline-block {
            display: inline-block;
            background-color: #c8e6c9; /* Light green background */
            width: 100px; /* Fixed width */
            height: 50px; /* Fixed height */
            margin: 5px; /* Space around the element */
            text-align: center; /* Center text in the box */
        }

        .hidden {
            display: none; /* This element is hidden */
        }

        .flex-container {
            display: flex; /* Flexbox layout */
            justify-content: space-around; /* Space between items */
            margin-top: 20px; /* Space above the flex container */
        }

        .flex-item {
            background-color: #ffccbc; /* Light orange background */
            padding: 20px; /* Padding for flex items */
            border: 1px solid #ffab40; /* Border for visibility */
        }
    </style>
</head>
<body>

    <h1>Understanding CSS Display Property</h1>

    <div class="block">This is a block element.</div>
    
    <span class="inline">This is an inline element.</span>
    <span class="inline">Another inline element.</span>

    <div class="inline-block">Inline Block 1</div>
    <div class="inline-block">Inline Block 2</div>

    <div class="hidden">This element is hidden and will not be displayed.</div>

    <div class="flex-container">
        <div class="flex-item">Flex Item 1</div>
        <div class="flex-item">Flex Item 2</div>
        <div class="flex-item">Flex Item 3</div>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Block Element:
\`\`\`End

\`\`\`Para
The block element takes up the full width and has a light blue background. It starts on a new line.
\`\`\`End

\`\`\`Bold
Inline Elements:
\`\`\`End

\`\`\`Para
Two inline elements are shown side by side, each with a light yellow background. They do not break to a new line.
\`\`\`End

\`\`\`Bold
Inline Block Elements:
\`\`\`End

\`\`\`Para
These elements have a fixed width and height, allowing them to be styled like blocks while still being placed inline.
\`\`\`End

\`\`\`Bold
Hidden Element:
\`\`\`End

\`\`\`Para
The hidden element will not be displayed at all, demonstrating how display: none; works.
\`\`\`End

\`\`\`Bold
Flex Container:
\`\`\`End

\`\`\`Para
The flex container displays its items in a flexible layout, with space evenly distributed between them. Each flex item has its own background and padding.
\`\`\`End
`
},
{
title: "CSS Position",
 content: `
\`\`\`Para
The CSS position property is crucial for controlling the placement of elements on a webpage. It determines how an element is positioned in relation to its normal flow, its parent, or the viewport. Understanding the various positioning methods is essential for creating responsive and well-structured layouts.
\`\`\`End

\`\`\`Bold
Common Values of the position Property
\`\`\`End

\`\`\`Bold
static:
\`\`\`End

\`\`\`Para
This is the default positioning for elements. Static elements are positioned according to the normal flow of the document, meaning they do not respond to top, right, bottom, or left properties.
\`\`\`End

\`\`\`Code
.static {
    position: static; /* Default positioning */
}
\`\`\`End

\`\`\`Bold
relative:
\`\`\`End

\`\`\`Para
The element is positioned relative to its normal position. Using top, right, bottom, or left will offset the element from where it would normally be.
\`\`\`End

\`\`\`Code
.relative {
    position: relative; /* Position relative to the original position */
    top: 10px; /* Moves the element down 10 pixels */
}
\`\`\`End

\`\`\`Bold
absolute:
\`\`\`End

\`\`\`Para
The element is positioned relative to the nearest positioned ancestor (an ancestor with a position of relative, absolute, or fixed). If no such ancestor exists, it is positioned relative to the initial containing block (usually the viewport).
\`\`\`End

\`\`\`Code
.absolute {
    position: absolute; /* Positioned absolutely */
    top: 20px; /* Moves the element 20 pixels from the top of its positioned ancestor */
    left: 30px; /* Moves the element 30 pixels from the left */
}
\`\`\`End

\`\`\`Bold
fixed:
\`\`\`End

\`\`\`Para
The element is positioned relative to the viewport, meaning it stays in the same place even when the page is scrolled. Fixed elements are removed from the normal document flow.
\`\`\`End

\`\`\`Code
.fixed {
    position: fixed; /* Fixed to the viewport */
    bottom: 10px; /* 10 pixels from the bottom of the viewport */
    right: 10px; /* 10 pixels from the right of the viewport */
}
\`\`\`End

\`\`\`Bold
sticky:
\`\`\`End

\`\`\`Para
The element is treated as relative until a specified scroll position is reached, at which point it is treated as fixed. This allows for elements to stick to a defined position as the user scrolls.
\`\`\`End

\`\`\`Code
.sticky {
    position: sticky; /* Sticky positioning */
    top: 0; /* Sticks to the top of its container */
}
\`\`\`End

\`\`\`Bold
Example of Using the position Property
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Position Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .container {
            position: relative; /* Positioned relative for absolute children */
            height: 200px; /* Fixed height for demonstration */
            background-color: #e0f7fa; /* Light blue background */
            margin-bottom: 20px; /* Space below the container */
        }

        .static {
            position: static; /* Default static positioning */
            background-color: #ffe082; /* Light yellow */
            padding: 10px; /* Padding inside */
        }

        .relative {
            position: relative; /* Relative positioning */
            top: 10px; /* Moves down */
            background-color: #c8e6c9; /* Light green */
            padding: 10px; /* Padding inside */
        }

        .absolute {
            position: absolute; /* Absolute positioning */
            top: 20px; /* Moves down 20 pixels */
            left: 30px; /* Moves right 30 pixels */
            background-color: #ffccbc; /* Light orange */
            padding: 10px; /* Padding inside */
        }

        .fixed {
            position: fixed; /* Fixed positioning */
            bottom: 10px; /* 10 pixels from the bottom */
            right: 10px; /* 10 pixels from the right */
            background-color: #e1bee7; /* Light purple */
            padding: 10px; /* Padding inside */
        }

        .sticky {
            position: sticky; /* Sticky positioning */
            top: 0; /* Sticks to the top of the viewport */
            background-color: #f0f4c3; /* Light lime */
            padding: 10px; /* Padding inside */
            z-index: 1; /* Ensures it stays above other content */
        }
    </style>
</head>
<body>

    <h1>Understanding CSS Position Property</h1>

    <div class="container">
        <div class="static">This is a static element.</div>
        <div class="relative">This is a relative element.</div>
        <div class="absolute">This is an absolute element.</div>
    </div>

    <div class="sticky">This is a sticky element that sticks to the top of the viewport when scrolling.</div>

    <p>Scroll down to see the fixed positioning in action.</p>
    <div style="height: 1000px;"> <!-- Just to create scroll space -->
        <p>Keep scrolling...</p>
    </div>

    <div class="fixed">This is a fixed element that stays at the bottom right corner.</div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Container:
\`\`\`End

\`\`\`Para
A container is created with relative positioning. This allows any absolutely positioned elements within it to be positioned relative to this container.
\`\`\`End

\`\`\`Bold
Static Element:
\`\`\`End

\`\`\`Para
The static element demonstrates default positioning and does not change its position in the document flow.
\`\`\`End

\`\`\`Bold
Relative Element:
\`\`\`End

\`\`\`Para
This element is moved 10 pixels down from its original position, showing how relative positioning works.
\`\`\`End

\`\`\`Bold
Absolute Element:
\`\`\`End

\`\`\`Para
Positioned absolutely, this element is placed 20 pixels from the top and 30 pixels from the left of the container.
\`\`\`End

\`\`\`Bold
Sticky Element:
\`\`\`End

\`\`\`Para
This element will stick to the top of the viewport when you scroll past it, illustrating how sticky positioning works.
\`\`\`End

\`\`\`Bold
Fixed Element:
\`\`\`End

\`\`\`Para
The fixed element stays in the bottom-right corner of the viewport, even when the page is scrolled.
\`\`\`End
`
},

{
title: "CSS Z-index",
 content: `
\`\`\`Para
The CSS z-index property controls the stacking order of elements that overlap. It is especially useful when dealing with positioned elements (those with position values of relative, absolute, fixed, or sticky). The z-index determines which element appears on top of others when they overlap.
\`\`\`End

\`\`\`Bold
How z-index Works
\`\`\`End

\`\`\`Bold
Stacking Context:
\`\`\`End

\`\`\`Para
The z-index only works on positioned elements. If an element has a z-index value, it creates a stacking context for its child elements.
\`\`\`End

\`\`\`Para
Elements without a z-index value will stack according to the order they appear in the HTML.
\`\`\`End

\`\`\`Bold
Integer Values:
\`\`\`End

\`\`\`Para
The z-index can take positive, negative, or zero integer values.
\`\`\`End

\`\`\`Para
Higher values will place the element on top of lower values. For example, an element with z-index: 10 will appear above an element with z-index: 5.
\`\`\`End

\`\`\`Bold
Initial Value:
\`\`\`End

\`\`\`Para
The default z-index is auto, which means the element follows the stacking order based on the document flow.
\`\`\`End

\`\`\`Bold
Example of Using z-index
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS z-index Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .box {
            width: 150px; /* Width of the boxes */
            height: 150px; /* Height of the boxes */
            position: absolute; /* Allow z-index to work */
            padding: 20px; /* Padding inside the boxes */
            color: white; /* Text color */
            text-align: center; /* Center text */
            line-height: 150px; /* Vertically center text */
        }

        .box1 {
            background-color: #ff5722; /* Red box */
            top: 50px; /* Position from the top */
            left: 50px; /* Position from the left */
            z-index: 2; /* Higher z-index */
        }

        .box2 {
            background-color: #2196f3; /* Blue box */
            top: 100px; /* Position from the top */
            left: 100px; /* Position from the left */
            z-index: 1; /* Lower z-index */
        }

        .box3 {
            background-color: #4caf50; /* Green box */
            top: 150px; /* Position from the top */
            left: 150px; /* Position from the left */
            z-index: 3; /* Highest z-index */
        }
    </style>
</head>
<body>

    <h1>Understanding CSS z-index</h1>

    <div class="box box1">Box 1</div>
    <div class="box box2">Box 2</div>
    <div class="box box3">Box 3</div>

    <p>Notice how the boxes overlap according to their z-index values.</p>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Box Structure:
\`\`\`End

\`\`\`Para
Three boxes are created using <div> elements, each with different background colors.
\`\`\`End

\`\`\`Bold
Positioning:
\`\`\`End

\`\`\`Para
All boxes are positioned absolutely, allowing them to overlap and making the z-index property effective.
\`\`\`End

\`\`\`Bold
Z-Index Values:
\`\`\`End

\`\`\`Para
Box 1 has a z-index of 2, placing it above Box 2.
\`\`\`End

\`\`\`Para
Box 2 has a z-index of 1, making it the lowest in the stacking order.
\`\`\`End

\`\`\`Para
Box 3 has the highest z-index of 3, placing it on top of both Box 1 and Box 2.
\`\`\`End

\`\`\`Bold
Visual Result:
\`\`\`End

\`\`\`Para
When rendered, Box 3 will appear on top, followed by Box 1, and then Box 2 at the back, demonstrating how z-index controls the stacking order.
\`\`\`End
`
},
{
title: "CSS Align",
 content: `
\`\`\`Para
The CSS align property is often used in conjunction with flexbox and grid layouts to control the alignment of elements within their containers. While there isn’t a single align property in CSS, alignment can be achieved through several related properties, primarily align-items, align-self, and justify-content in flexbox and grid contexts.
\`\`\`End

\`\`\`Bold
Key Properties for Alignment
\`\`\`End

\`\`\`Bold
align-items:
\`\`\`End

\`\`\`Para
This property defines the default behavior for how flex items are aligned along the cross axis (perpendicular to the main axis). It applies to the entire container.
\`\`\`End

\`\`\`Bold
Possible values include:
\`\`\`End

\`\`\`Para
flex-start: Aligns items to the start of the container.
\`\`\`End

\`\`\`Para
flex-end: Aligns items to the end of the container.
\`\`\`End

\`\`\`Para
center: Centers items in the container.
\`\`\`End

\`\`\`Para
baseline: Aligns items along their baseline.
\`\`\`End

\`\`\`Para
stretch: Stretches items to fill the container (default).
\`\`\`End

\`\`\`Bold
align-self:
\`\`\`End

\`\`\`Para
This property allows the default alignment (set by align-items) to be overridden for individual flex items. It can be used to align a specific item differently from others.
\`\`\`End

\`\`\`Para
It accepts the same values as align-items.
\`\`\`End

\`\`\`Bold
justify-content:
\`\`\`End

\`\`\`Para
This property defines how flex items are distributed along the main axis (horizontal direction in a row-based flex container). It controls the alignment of items in the direction of the main axis.
\`\`\`End

\`\`\`Bold
Possible values include:
\`\`\`End

\`\`\`Para
flex-start: Items are packed toward the start.
\`\`\`End

\`\`\`Para
flex-end: Items are packed toward the end.
\`\`\`End

\`\`\`Para
center: Items are centered.
\`\`\`End

\`\`\`Para
space-between: Items are evenly distributed with space between them.
\`\`\`End

\`\`\`Para
space-around: Items are evenly distributed with space around them.
\`\`\`End

\`\`\`Bold
Example of Using Alignment Properties
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Alignment Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .container {
            display: flex; /* Enable flexbox layout */
            justify-content: center; /* Center items along the main axis */
            align-items: center; /* Center items along the cross axis */
            height: 300px; /* Fixed height for the container */
            border: 2px solid #2196f3; /* Border for visibility */
            margin-bottom: 20px; /* Space below each container */
        }

        .item {
            width: 100px; /* Fixed width for items */
            height: 100px; /* Fixed height for items */
            background-color: #ffccbc; /* Light orange background */
            margin: 10px; /* Margin around each item */
            display: flex; /* Enable flexbox layout for items */
            justify-content: center; /* Center text horizontally */
            align-items: center; /* Center text vertically */
        }

        .item.special {
            align-self: flex-start; /* Override alignment for this item */
        }
    </style>
</head>
<body>

    <h1>Understanding CSS Alignment</h1>

    <h2>Aligned Center</h2>
    <div class="container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>

    <h2>Override Alignment with align-self</h2>
    <div class="container">
        <div class="item">Item A</div>
        <div class="item special">Item B (Aligned Start)</div>
        <div class="item">Item C</div>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Container Setup:
\`\`\`End

\`\`\`Para
Each container is set up with display: flex, allowing the items inside to be aligned using flexbox properties.
\`\`\`End

\`\`\`Bold
Aligning Center:
\`\`\`End

\`\`\`Para
In the first container, justify-content: center centers the items horizontally, while align-items: center centers them vertically within the container.
\`\`\`End

\`\`\`Bold
Individual Item Alignment:
\`\`\`End

\`\`\`Para
In the second container, Item B uses align-self: flex-start, which overrides the default alignment for that specific item, positioning it at the start of the container instead of centered.\`\`\`End
`
},
{
title: "CSS Overflow",
 content: `
\`\`\`Para
The CSS overflow property controls what happens to content that exceeds the bounds of an element's box. It is particularly useful for managing layout and ensuring that overflowing content is handled in a way that maintains usability and aesthetics.
\`\`\`End

\`\`\`Bold
Overflow Property Values
\`\`\`End

\`\`\`Bold
visible:
\`\`\`End

\`\`\`Para
This is the default value. Content that exceeds the bounds of the box will be visible outside the box.
\`\`\`End

\`\`\`Code
overflow: visible; /* Default behavior */
\`\`\`End

\`\`\`Bold
hidden:
\`\`\`End

\`\`\`Para
Content that exceeds the bounds of the box will be clipped, and the excess content will not be visible.
\`\`\`End

\`\`\`Code
overflow: hidden; /* Clip overflowing content */
\`\`\`End

\`\`\`Bold
scroll:
\`\`\`End

\`\`\`Para
A scrollbar is added, allowing users to scroll to see the overflowing content. Scrollbars will always be present, regardless of whether the content overflows or not.
\`\`\`End

\`\`\`Code
overflow: scroll; /* Add scrollbars */
\`\`\`End

\`\`\`Bold
auto:
\`\`\`End

\`\`\`Para
A scrollbar is added only when necessary. If the content fits within the box, no scrollbar is shown; if it overflows, scrollbars appear.
\`\`\`End

\`\`\`Code
overflow: auto; /* Scrollbars appear as needed */
\`\`\`End

\`\`\`Bold
overlay (not widely supported):
\`\`\`End

\`\`\`Para
The scrollbar appears over the content, rather than pushing it. This value is not standard and is not supported in all browsers.
\`\`\`End

\`\`\`Bold
Example of Using the overflow Property
\`\`\`End

\`\`\`Code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Overflow Example</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Set the font for the body */
            background-color: #f9f9f9; /* Light background color */
            padding: 20px; /* Padding for the body */
        }

        .container {
            width: 300px; /* Fixed width */
            height: 150px; /* Fixed height */
            border: 2px solid #2196f3; /* Border for visibility */
            margin-bottom: 20px; /* Space below each container */
            padding: 10px; /* Padding inside the container */
            overflow: hidden; /* Clip overflowing content */
        }

        .content {
            height: 200px; /* Height greater than the container */
            background-color: #ffccbc; /* Light orange background */
        }

        .scrollable {
            overflow: auto; /* Scrollbars appear as needed */
        }
    </style>
</head>
<body>

    <h1>Understanding CSS Overflow</h1>

    <h2>Overflow: Hidden</h2>
    <div class="container">
        <div class=content>This is some content that exceeds the container's height. It will be clipped and hidden.</div>
    </div>

    <h2>Overflow: Auto</h2>
    <div class="container scrollable">
        <div class=content>This content is also too tall for the container. However, when you scroll down, you can see more of it.</div>
    </div>

</body>
</html>
\`\`\`End

\`\`\`Bold
Explanation of the Example
\`\`\`End

\`\`\`Bold
Container Setup:
\`\`\`End

\`\`\`Para
Each container has a fixed width and height, making it clear when content overflows.
\`\`\`End

\`\`\`Bold
Overflow: Hidden:
\`\`\`End

\`\`\`Para
In the first example, the container uses overflow: hidden, so any content that exceeds the height of the container is clipped and not visible.
\`\`\`End

\`\`\`Bold
Overflow: Auto:
\`\`\`End

\`\`\`Para
In the second example, the container uses overflow: auto. When the content exceeds the height of the container, a scrollbar appears, allowing the user to scroll and view the overflowed content.
\`\`\`End
`
},
]


export default lessonsWeb;