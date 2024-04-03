// Copyright (c) 2024 4TiZalewski

// @ts-check

/**
 * @type {HTMLInputElement | null}
 */
const present_nullable = document.querySelector("#present");

/**
 * @type {HTMLButtonElement | null}
 */
const submit_present_btn_nullable = document.querySelector("#submit-present");

/**
 * @type {HTMLInputElement | null}
 */
const name_nullable = document.querySelector("#name");

/**
 * @type {HTMLButtonElement | null}
 */
const submit_name_btn_nullable = document.querySelector("#submit-name");

/**
 * @type {HTMLElement | null}
 */
const display_nullable = document.querySelector("#display");

/**
 * @type {Array<string>}
 */
const presents = [];

if (present_nullable && submit_present_btn_nullable && name_nullable && submit_present_btn_nullable && display_nullable) {
    const present = /** @type {HTMLInputElement} */ (present_nullable);
    const submit_present_btn = /** @type {HTMLButtonElement} */ (submit_present_btn_nullable);
    const name = /** @type {HTMLInputElement} */ (name_nullable);
    const submit_name_btn = /** @type {HTMLInputElement} */ (submit_name_btn_nullable);
    const display = /** @type {HTMLElement} */ (display_nullable);

    submit_present_btn.addEventListener("click", (event) => {
        event.preventDefault();

        const value = present.value.trim();
        present.value = "";

        if (value.length > 2) {
            presents.push(value);
            console.log(presents);

            message(display, ["", "important-msg"], "Dodałeś ", value, " do listy prezentów");
        } else {
            message(display, [], "Wprowadź poprawną nazwę prezentu");
        }
    });

    submit_name_btn.addEventListener("click", (event) => {
        event.preventDefault();

        const value = name.value.trim();
        name.value = "";

        if (value.length > 2) {
            if (presents.length != 0) {
                let random_present = presents[Math.floor(Math.random() * presents.length)];
                message(display, ["important-name", "", "important-msg"], value, " wylosowany dla Ciebie prezent to: ", random_present);
            } else {
                message(display, [], "Brak prezentów");
            }
        } else {
            message(display, [], "Wprowadź poprawne imię");
        }
    });
} else {
    console.warn("Required elements are missing!");
}

/**
 * @param {HTMLElement} element 
 */
function clear_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * @param {HTMLElement} display 
 * @param {Array<string>} classes
 * @param  {...string} texts 
 */
function message(display, classes, ...texts) {
    const msg = document.createElement("div");
    msg.className = "msg";

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const text_element = document.createElement("p");

        if (classes.length > i) {
            text_element.className = classes[i];
        }

        text_element.innerText = text;

        msg.append(text_element);
    }

    clear_children(display);
    display.append(msg);
}
