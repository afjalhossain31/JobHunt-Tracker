## JavaScript DOM Questions & Answers

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**getElementById:**
- Finds ONE element by its ID
- Returns a single element or null
- Fastest method
```javascript  Example:
const header = document.getElementById("header");
```

**getElementsByClassName:**
- Finds ALL elements with a specific class name
- Returns a live HTMLCollection (auto-updates when DOM changes)
- Returns array-like object, not actual array
```javascript
const className = document.getElementsByClassName("className");
```

**querySelector:**
- Finds the FIRST element that matches a CSS selector
- More flexible, can use any CSS selector
- Returns single element or null
```javascript
const selector = document.querySelector("selector");
```

**querySelectorAll:**
- Finds ALL elements that match a CSS selector
- Returns a static NodeList (doesn't auto-update)
- Can use complex CSS selectors
```javascript
const allSelector = document.querySelectorAll("allSelector");
```

**Key Difference:** querySelector/querySelectorAll are more powerful and flexible because they accept any CSS selector. The other methods only work with ID or class names.

---

## 2. How do you create and insert a new element into the DOM?

There are 3 main steps:

**Step 1: Create the element**
```javascript
const div = document.createElement('div');
```

**Step 2: Add content and attributes**
```javascript
div.className = 'card';
div.innerHTML = '<h2>New Card</h2>';
// or
div.textContent = 'Hello World';
```

**Step 3: Insert it into the DOM**
```javascript
// Add at the end
parentElement.appendChild(div);

// Add at the beginning
parentElement.prepend(div);

// Add before another element
parentElement.insertBefore(div, referenceElement);

// Add using insert Adjacent HTML
parentElement.insertAdjacentHTML('beforeend', '<div>New content</div>');
```

## 3. What is Event Bubbling? And how does it work?

**Event Bubbling:** When an event happens on an element, it first runs on that child element, then on its parent, then grandparent, and so on up to the document.

**How it works:**
```
Click on button → button event → parent div event → body event → document event
```

**Example:**
```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

```javascript
document.getElementById("parent").addEventListener('click', function() {
    console.log("Parent clicked!");
});

document.getElementById("child").addEventListener('click', function() {
    console.log("Button clicked!");
});
```

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation:** Instead of adding event listeners to many child elements, you add ONE listener to their parent. The parent listens for events that bubble up from children.

**Example WITHOUT Event Delegation:**
```javascript
document.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        // delete code
    });
});
```

**Example WITH Event Delegation:**
```javascript
document.getElementById("main")
    .addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
        console.log("Delete clicked");
    }
});
```

**Why it's useful:**
1. **Performance good:** Only one event listener instead of hundreds
2. **Dynamic elements Supported:** Works for elements added later (no need to re-attach listeners)
3. **Memory efficient:** Less memory usage
4. **Easier to code clean:** One place to manage all events

## 5. What is the difference between preventDefault() and stopPropagation() methods?

**preventDefault():**
- Stops the browser's default action for that event
- Does NOT stop event bubbling
- Used when you want to override default behavior

**stopPropagation():**
- Stops the event from bubbling up to parent elements
- Does NOT prevent default browser behavior
- Used when you don't want parent listeners to fire

**Key Difference:**
- `preventDefault()` =  Browser er default kaj bond kore
- `stopPropagation()` = Event bubbling bond kore.


