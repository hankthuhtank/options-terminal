# The Bench

An interactive field manual for learning to code: C++, Java, JavaScript, HTML, CSS, the DOM, HTTP, servers, SQL, security, Git and deployment — in one place, in an order that builds on itself.

**Open `index.html`.** No build step, no install, no server, no internet connection required (an internet connection only improves the typography).

---

## What makes this different

Most coding sites show you code. This one runs it and then lets you watch it happen.

- **Everything executes in the browser.** C++, Java and JavaScript run on a purpose-built interpreter written for this project. SQL runs on a small query engine. HTML and CSS render live in a sandboxed frame.
- **The trace scrubber.** After you press Run, drag the slider under the editor. The current line highlights, the variables panel updates with changed values flashing, the call stack grows and shrinks, and output appears exactly when the program produced it. This is the single most useful thing here — a program stops being a wall of text and becomes something you can watch.
- **Every sample is editable.** Break them on purpose. The error messages are written in plain English and point at the line.
- **Challenges are checked automatically.** 29 of them, each a small change to make. Solving one marks the lesson complete.

---

## Layout

| Area | What it is |
|---|---|
| **Overview** | Progress, the course map, how to use it |
| **Course** | 70 lessons across 13 modules, in dependency order |
| **Bench** | A free scratch pad in any of the five languages |
| **Glossary** | 405 terms in plain English, searchable and filterable |

Progress, your code edits and your theme are saved in the browser. Nothing leaves your machine.

---

## The course

```
CS-00  Orientation .............. what code is, how it runs, reading errors, the toolchain
CS-01  C++ ...................... 12 lessons, hello world through classes, memory and sorting
CS-02  Java ..................... 11 lessons, the JVM through inheritance, exceptions, collections
CS-03  JavaScript ...............  6 lessons, values through closures and async
CS-04  HTML .....................  4 lessons, document structure, semantics, forms
CS-05  CSS ......................  4 lessons, the cascade, box model, flexbox, grid
CS-06  The DOM ..................  3 lessons, selecting, events, form handling
CS-07  How the internet moves data  4 lessons, requests, status codes, JSON, DNS and TLS
CS-08  Servers and backends .....  4 lessons, what a server is, middleware, config, hosting
CS-09  Databases and SQL ........  6 lessons, schema through joins, aggregates, indexes, transactions
CS-10  Auth and security ........  4 lessons, authn vs authz, hashing, injection, habits
CS-11  Git and debugging ........  4 lessons, the Git model, branching, the debug loop, testing
CS-12  Shipping it ..............  4 lessons, deployment, containers, monitoring, what to build next
```

---

## Keyboard

| Key | Does |
|---|---|
| `Ctrl` / `Cmd` + `Enter` | Run the code |
| `←` `→` | Step through the trace when the scrubber is focused |
| `[` `]` | Previous / next lesson |
| `Esc` | Close a dialog or the mobile index |

---

## What the language runtimes support

The C++/Java/JavaScript engine is a teaching interpreter, not a compiler. It covers the subset you actually meet while learning:

- All primitive types with correct integer division and language-accurate printing (C++ prints `1` for a true bool, Java prints `4.0` for a whole double)
- `if` / `else if` / `else`, `while`, `do/while`, `for`, range-based `for`, `for...of`, `for...in`, `switch`, `break`, `continue`
- Functions, recursion, overloading, default arguments, and a real call stack
- Classes, constructors, fields, methods, inheritance, `super`, and method overriding
- Arrays, `vector`, `ArrayList`, objects, object literals, and string methods
- `try` / `catch` / `finally` and `throw`, including catching real runtime faults
- Arrow functions and closures in JavaScript
- `cout` / `cin`, `printf`, `System.out.println`, `console.log`, and the `Math` library
- Guard rails: it stops an endless loop, catches out-of-range indexing, and refuses division by zero with a readable message rather than hanging your tab

It does not do templates, pointer arithmetic, threads, file I/O, or the wider standard libraries. Those are noted in the lessons where they come up.

The SQL engine supports `CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE`, `CREATE INDEX`, and `SELECT` with `WHERE`, `INNER`/`LEFT JOIN`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`, `DISTINCT`, `LIKE`, `IN`, `BETWEEN`, `CASE`, and the aggregate functions. A sample `customers` / `orders` / `inventory` database is loaded fresh on every run.

---

## Files

```
index.html        the shell
styles.css        the visual system
engine.js         lexer and parser for the C-family languages
interp.js         evaluator and execution-trace recorder
sql.js            the SQL engine
glossary.js       405 terms
curriculum-1.js   orientation, C++, Java
curriculum-2.js   JavaScript, HTML, CSS, the DOM
curriculum-3.js   HTTP, servers, SQL, security, Git, shipping
app.js            navigation, editor, scrubber, challenge checking
```

Adding a lesson means adding one object to a curriculum file. If it has a `code` field in `cpp`, `java` or `js`, it becomes runnable and steppable with no further work.

---

## Deploying

It is a static site. Push the folder to a GitHub Pages branch, or drop it on any host. There is nothing to build and no server-side component.

---

## A note on the design

The look is pulled from the subject's own materials rather than a template: solder-mask green, silkscreen white, gold-plated pads and copper traces, with the call-number indexing of a technical manual. Type is Bricolage Grotesque for display and IBM Plex Sans/Mono for everything else. Dark and light both ship; the toggle is in the header.
