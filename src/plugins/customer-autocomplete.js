function customer_autocomplete(inp, arr) {
  let d = document.getElementById("customer-autocomplete");
  d.classList.add("list-group", "position-relative");
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    a = document.createElement("div");
    a.classList.add(
      "autocomplete-items",
      "bg-light",
      "position-absolute",
      "border",
      "mt-1",
      "w-100",
      "rounded",
      "shadow-sm"
    );

    a.style.top = "100%";
    a.style.zIndex = 99;

    this.parentNode.appendChild(a);
    let btn = document.createElement("div");
    btn.innerHTML =
      '<button class="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#add-customer-modal">+ Add customer</button>';
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("li");
        b.classList.add("list-group-item", "border-0");
        b.innerHTML = arr[i].substr(0, val.length);
        b.innerHTML += "<strong>" + arr[i].substr(val.length) + "</strong>";
        b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
        b.addEventListener("click", function (e) {
          app.customerName = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
        a.appendChild(btn);
      } else {
        a.appendChild(btn);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id);
    if (x) {
      x = x.getElementsByTagName("div");
    }
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) {
          x[currentFocus].click();
        }
      }
    }
  });

  function addActive(x) {
    if (!x) {
      return false;
    }
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1;
    }
    x[currentFocus].classList.add("active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }
  }

  function closeAllLists(el) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (el != x[i] && el != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
