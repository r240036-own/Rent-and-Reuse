const KEY = {
    users: "reuse_users",
    products: "reuse_products",
    bookings: "reuse_bookings",
    current: "reuse_current"
};

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function currentUser() {
    return JSON.parse(localStorage.getItem(KEY.current));
}

function makeId() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}


// PRODUCT COLLECTION

const starterProducts = [
    ["Umbrella","Travel",20,
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600",
    "Stay prepared for unexpected rain."],

    ["Scientific Calculator","Study Essentials",25,
    "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600",
    "Useful for mathematics and engineering students."],

    ["Power Bank","Electronics",40,
    "https://images.unsplash.com/photo-1609592424806-2c4c4c67f7a7?w=600",
    "Keep your devices charged on the go."],

    ["Tripod Stand","Electronics",60,
    "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=600",
    "Perfect for photography and video calls."],

    ["Extension Cord","Home & Living",20,
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    "Extra power access for your room."],

    ["Backpack","Travel",35,
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    "A handy bag for short trips."],

    ["Board Game","Sports & Games",30,
    "https://images.unsplash.com/photo-1606503153255-59d8b8b821a7?w=600",
    "Enjoy a fun evening with friends."],

    ["Lunch Box","Home & Living",15,
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    "A reusable container for everyday meals."],

    ["Headphones","Electronics",50,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    "Enjoy music, movies, and online classes."],

    ["Study Lamp","Study Essentials",25,
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    "Brighten up your study table."],

    ["Yoga Mat","Sports & Games",30,
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    "For yoga and home workouts."],

    ["Electric Kettle","Home & Living",45,
    "https://images.unsplash.com/photo-1594213114663-d94db9b1714e?w=600",
    "Convenient for quick hot drinks."],

    ["Mini Projector","Electronics",150,
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600",
    "Turn any wall into a movie screen."],

    ["Guitar","Sports & Games",100,
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600",
    "Explore music without buying an instrument."],

    ["Screwdriver Set","Tools",35,
    "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=600",
    "Handy tools for small repairs."],

    ["Reusable Water Bottle","Home & Living",12,
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    "Stay hydrated at college, work, or on the go."],
    ["Wireless Mouse","Electronics",25,
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    "A handy extra for study sessions and presentations."],
    ["Keyboard","Electronics",35,
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    "Make typing more comfortable at your desk."],
    ["Notebook Set","Study Essentials",10,
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600",
    "Keep notes and ideas together without buying a full pack."],
    ["Stationery Kit","Study Essentials",15,
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
    "Everyday stationery for classes and creative projects."],
    ["Tote Bag","Travel",12,
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    "Carry books and daily essentials with ease."],
    ["Mini Desk Fan","Home & Living",20,
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600",
    "A compact breeze for warm study days."],
    ["Badminton Racket","Sports & Games",30,
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
    "Enjoy a game with friends without buying equipment."],
    ["Raincoat","Travel",25,
    "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=600",
    "A useful backup for sudden rainy weather."],
    ["Cooking Pan","Home & Living",30,
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
    "Borrow kitchen essentials for a short stay or special meal."],
    ["Phone Stand","Electronics",10,
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600",
    "Keep your phone upright for calls and videos."],
    ["Picnic Mat","Home & Living",20,
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    "Make outdoor breaks and picnics more comfortable."]
];

if (!localStorage.getItem(KEY.products)) {
    saveData(KEY.products, starterProducts.map((p,i)=>({
        id: "starter"+i,
        name:p[0],
        category:p[1],
        price:p[2],
        image:p[3],
        description:p[4],
        owner:"admin"
    })));
}


// NAVIGATION

function showPage(id) {
    const protectedPages = ["list","bookings","mylistings"];

    if (protectedPages.includes(id) && !currentUser()) {
        alert("Please login to continue.");
        id = "login";
    }

    document.querySelectorAll(".page")
        .forEach(p=>p.classList.remove("active"));

    document.getElementById(id).classList.add("active");

    if (id==="home") renderFeatured();
    if (id==="products") renderProducts();
    if (id==="bookings") renderBookings();
    if (id==="mylistings") renderMyListings();
    if (id==="booking") setDateLimits();

    window.scrollTo(0,0);
}


// REGISTRATION

document.getElementById("registerForm")
.addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("regName").value.trim();
    const email=document.getElementById("regEmail").value.trim().toLowerCase();
    const phone=document.getElementById("regPhone").value.trim();
    const password=document.getElementById("regPassword").value;
    const confirm=document.getElementById("confirmPassword").value;

    if(password!==confirm){
        alert("Passwords do not match.");
        return;
    }

    const users=getData(KEY.users);

    if(users.some(u=>u.email===email)){
        alert("Email already registered.");
        return;
    }

    users.push({
        id:makeId(),
        name,
        email,
        phone,
        password
    });

    saveData(KEY.users,users);

    alert("Welcome to RE:USE! Registration successful.");
    this.reset();
    showPage("login");
});


// LOGIN

document.getElementById("loginForm")
.addEventListener("submit",function(e){
    e.preventDefault();

    const email=document.getElementById("loginEmail").value.trim().toLowerCase();
    const password=document.getElementById("loginPassword").value;

    const user=getData(KEY.users).find(u=>
        u.email===email && u.password===password
    );

    if(!user){
        alert("Incorrect email or password.");
        return;
    }

    localStorage.setItem(KEY.current,JSON.stringify({
        id:user.id,
        name:user.name,
        email:user.email
    }));

    this.reset();
    updateHeader();

    alert("Login successful. Happy sharing!");
    showPage("home");
});


// LOGOUT

function logout(){
    localStorage.removeItem(KEY.current);
    updateHeader();
    alert("Logged out successfully.");
    showPage("home");
}


// HEADER

function updateHeader(){
    const user=currentUser();

    document.getElementById("authButtons")
        .classList.toggle("hidden",!!user);

    document.getElementById("userArea")
        .classList.toggle("hidden",!user);

    document.getElementById("navbar")
        .classList.toggle("hidden",!user);

    if(user){
        document.getElementById("welcomeUser").textContent=
            "Hi, "+user.name;
    }
}


// PRODUCT CATEGORIES

const categoryNames=[
    "All","Electronics","Study Essentials",
    "Home & Living","Travel","Tools",
    "Sports & Games","Other"
];

let activeCategory="All";

function renderCategories(){
    const container=document.getElementById("categories");
    container.replaceChildren();

    categoryNames.forEach(name=>{
        const button=document.createElement("button");
        button.className="category-btn"+
            (activeCategory===name?" active":"");
        button.textContent=name;

        button.onclick=()=>{
            activeCategory=name;
            renderCategories();
            renderProducts();
        };

        container.appendChild(button);
    });
}


// PRODUCT CARD

function productCard(product,ownerView=false){
    const card=document.createElement("article");
    card.className="product-card";

    const img=document.createElement("img");
    img.src=product.image;
    img.alt=product.name;
    img.loading="lazy";

    img.onerror=function(){
        this.src="https://placehold.co/600x400?text=RE%3AUSE";
    };

    const info=document.createElement("div");
    info.className="product-info";

    const title=document.createElement("h3");
    title.textContent=product.name;

    const desc=document.createElement("p");
    desc.textContent=product.description;

    const category=document.createElement("span");
    category.className="pill";
    category.textContent=product.category;

    const price=document.createElement("p");
    price.className="product-price";
    price.innerHTML="₹"+product.price+
        " <small>/ day</small>";

    const button=document.createElement("button");
    button.className="btn";

    if(ownerView){
        button.textContent="Remove Listing";
        button.onclick=()=>deleteProduct(product.id);
    }else{
        button.textContent="Rent This Item";
        button.onclick=()=>startBooking(product.id);
    }

    if(!ownerView){
        const {start,end}=selectedAvailabilityDates();
        const available=isAvailableForDates(product.id,start,end);
        const status=document.createElement("span");
        status.className="availability-tag"+(available===false?" unavailable":"");
        status.textContent=available===null?"Availability: choose dates":(available?"✓ Available for selected dates":"✕ Already booked for these dates");
        info.appendChild(status);
        if(available===false && start && end) button.disabled=true;
    }
    info.append(title,desc,category,price,button);

    if(!ownerView){
        const contactButton=document.createElement("button");
        contactButton.type="button";
        contactButton.className="contact-btn";
        contactButton.textContent="Contact Owner";
        const contactPanel=document.createElement("div");
        contactPanel.className="owner-contact";
        contactPanel.hidden=true;
        contactButton.addEventListener("click",()=>{
            const isOpen=!contactPanel.hidden;
            if(isOpen){ contactPanel.hidden=true; contactButton.textContent="Contact Owner"; return; }
            contactPanel.replaceChildren();
            const owner=getData(KEY.users).find(u=>u.id===product.owner);
            const heading=document.createElement("strong");
            heading.textContent=owner ? `Owner: ${owner.name}` : "RE:USE listing";
            contactPanel.appendChild(heading);
            if(owner && owner.email){
                const email=document.createElement("div");
                email.textContent=`Email: ${owner.email}`;
                contactPanel.appendChild(email);
                const mail=document.createElement("a");
                mail.href=`mailto:${owner.email}?subject=${encodeURIComponent('Question about '+product.name)}`;
                mail.textContent="Email owner";
                contactPanel.appendChild(mail);
            }
            if(owner && owner.phone){
                const phone=document.createElement("div"); phone.textContent=`Phone: ${owner.phone}`; contactPanel.appendChild(phone);
                const call=document.createElement("a"); call.href=`tel:${owner.phone.replace(/[^+0-9]/g,'')}`; call.textContent="Call owner"; contactPanel.appendChild(call);
            }
            if(!owner){
                const note=document.createElement("div");
                note.textContent="This is a sample item. Owner contact details will appear on items listed by registered users.";
                contactPanel.appendChild(note);
            } else if(!owner.email && !owner.phone){
                const note=document.createElement("div"); note.textContent="The owner has not added contact details yet."; contactPanel.appendChild(note);
            }
            contactPanel.hidden=false; contactButton.textContent="Hide Owner Details";
        });
        info.append(contactButton,contactPanel);
        const reportButton=document.createElement("button");
        reportButton.type="button";
        reportButton.className="report-item-btn";
        reportButton.textContent="Report this item";
        reportButton.addEventListener("click",()=>openReportForm(product));
        info.appendChild(reportButton);
    }
    card.append(img,info);

    return card;
}


// RENDER PRODUCTS

function selectedAvailabilityDates(){
    return {
        start:document.getElementById("availabilityStart")?.value || "",
        end:document.getElementById("availabilityEnd")?.value || ""
    };
}

function isAvailableForDates(productId,start,end){
    if(!start||!end||end<start)return null;
    return !getData(KEY.bookings).some(b=>
        b.productId===productId && b.status==="Confirmed" &&
        start<=b.endDate && end>=b.startDate
    );
}

function updateAvailabilitySummary(){
    const {start,end}=selectedAvailabilityDates();
    const summary=document.getElementById("availabilitySummary");
    const button=document.getElementById("checkAvailabilityBtn");
    if(!start||!end){summary.textContent="Select a start and return date to check availability.";return;}
    if(end<start){summary.textContent="Return date must be on or after the start date.";return;}
    const matching=getData(KEY.products).filter(p=>
        p.name.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase().trim()) &&
        (activeCategory==="All"||p.category===activeCategory)
    );
    const available=matching.filter(p=>isAvailableForDates(p.id,start,end)).length;
    summary.textContent=`${available} of ${matching.length} listed item${matching.length===1?"":"s"} available from ${start} to ${end}.`;
}

function renderProducts(){
    const grid=document.getElementById("productGrid");
    const search=document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const products=getData(KEY.products).filter(p=>
        p.name.toLowerCase().includes(search) &&
        (activeCategory==="All" ||
         p.category===activeCategory)
    );

    grid.replaceChildren();
    updateAvailabilitySummary();

    if(!products.length){
        grid.innerHTML=
            '<div class="empty">No matching items found. Try another search.</div>';
        return;
    }

    products.forEach(p=>grid.appendChild(productCard(p)));
}


// FEATURED

function renderFeatured(){
    const grid=document.getElementById("featuredProducts");
    grid.replaceChildren();

    getData(KEY.products).slice(0,4)
        .forEach(p=>grid.appendChild(productCard(p)));
}


// ADD PRODUCT

document.getElementById("productForm")
.addEventListener("submit",function(e){
    e.preventDefault();

    const user=currentUser();

    if(!user){
        alert("Please login first.");
        showPage("login");
        return;
    }

    const product={
        id:makeId(),
        name:document.getElementById("productName").value.trim(),
        category:document.getElementById("productCategory").value,
        price:Number(document.getElementById("productPrice").value),
        image:document.getElementById("productImage").value.trim(),
        description:document.getElementById("productDescription").value.trim(),
        owner:user.id
    };

    if(!Number.isFinite(product.price)||product.price<=0){
        alert("Enter a valid price.");
        return;
    }

    const products=getData(KEY.products);
    products.push(product);
    saveData(KEY.products,products);

    this.reset();

    alert("Your item has been listed successfully!");
    showPage("mylistings");
});


// MY LISTINGS

function renderMyListings(){
    const user=currentUser();
    const grid=document.getElementById("myListingGrid");

    grid.replaceChildren();

    if(!user)return;

    const products=getData(KEY.products)
        .filter(p=>p.owner===user.id);

    if(!products.length){
        grid.innerHTML=
            '<div class="empty">You have not listed anything yet.</div>';
        return;
    }

    products.forEach(p=>
        grid.appendChild(productCard(p,true))
    );
}


// DELETE PRODUCT

function deleteProduct(id){
    const user=currentUser();

    if(!user)return;

    if(!confirm("Remove this listing?"))return;

    const products=getData(KEY.products);
    const product=products.find(p=>p.id===id);

    if(!product||product.owner!==user.id){
        alert("You cannot remove this item.");
        return;
    }

    const hasBooking=getData(KEY.bookings).some(b=>
        b.productId===id && b.status==="Confirmed"
    );

    if(hasBooking){
        alert("This item has a confirmed booking and cannot be removed.");
        return;
    }

    saveData(KEY.products,products.filter(p=>p.id!==id));
    renderMyListings();
}


// BOOKING

let selectedProductId=null;

function startBooking(id){
    const user=currentUser();

    if(!user){
        alert("Please login to book an item.");
        showPage("login");
        return;
    }

    const product=getData(KEY.products).find(p=>p.id===id);

    if(!product)return;

    if(product.owner===user.id){
        alert("You cannot rent your own item.");
        return;
    }

    selectedProductId=id;

    document.getElementById("bookingDetails").textContent=
        product.name+" — ₹"+product.price+" per day";

    document.getElementById("startDate").value="";
    document.getElementById("endDate").value="";
    document.getElementById("totalPrice").textContent="Total: ₹0";

    showPage("booking");
}


// DATE LIMITS

function todayString(){
    const d=new Date();
    d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
}

function setDateLimits(){
    const today=todayString();
    document.getElementById("startDate").min=today;
    document.getElementById("endDate").min=today;
}

// Availability search on the Explore page
(function setupAvailabilityChecker(){
    const start=document.getElementById("availabilityStart");
    const end=document.getElementById("availabilityEnd");
    if(!start||!end)return;
    start.min=todayString(); end.min=todayString();
    start.addEventListener("change",()=>{
        end.min=start.value||todayString();
        if(end.value && end.value<start.value)end.value="";
        renderProducts();
    });
    end.addEventListener("change",renderProducts);
    document.getElementById("checkAvailabilityBtn").addEventListener("click",()=>{
        updateAvailabilitySummary();
        renderProducts();
    });
})();

document.getElementById("startDate")
.addEventListener("change",function(){
    document.getElementById("endDate").min=this.value;

    if(document.getElementById("endDate").value<this.value){
        document.getElementById("endDate").value="";
    }

    calculateTotal();
});

document.getElementById("endDate")
.addEventListener("change",calculateTotal);


// CALCULATE RENT

function calculateTotal(){
    const product=getData(KEY.products)
        .find(p=>p.id===selectedProductId);

    if(!product)return;

    const start=document.getElementById("startDate").value;
    const end=document.getElementById("endDate").value;

    if(!start||!end)return;

    const days=Math.round(
        (new Date(end+"T00:00:00")-
         new Date(start+"T00:00:00"))/86400000
    )+1;

    if(days<=0){
        document.getElementById("totalPrice").textContent=
            "Select valid dates.";
        return;
    }

    document.getElementById("totalPrice").textContent=
        "Total: ₹"+(days*product.price)+
        " ("+days+" days)";
}


// CONFIRM BOOKING

document.getElementById("bookingForm")
.addEventListener("submit",function(e){
    e.preventDefault();

    const user=currentUser();
    const product=getData(KEY.products)
        .find(p=>p.id===selectedProductId);

    if(!user||!product)return;

    if(product.owner===user.id){
        alert("You cannot book your own item.");
        return;
    }

    const startDate=document.getElementById("startDate").value;
    const endDate=document.getElementById("endDate").value;

    if(!startDate||!endDate||endDate<startDate){
        alert("Please select valid rental dates.");
        return;
    }

    if(startDate<todayString()){
        alert("Start date cannot be in the past.");
        return;
    }

    const days=Math.round(
        (new Date(endDate+"T00:00:00")-
         new Date(startDate+"T00:00:00"))/86400000
    )+1;

    const bookings=getData(KEY.bookings);

    const overlap=bookings.some(b=>
        b.productId===product.id &&
        b.status==="Confirmed" &&
        startDate<=b.endDate &&
        endDate>=b.startDate
    );

    if(overlap){
        alert("Item is already booked during these dates.");
        return;
    }

    bookings.push({
        id:makeId(),
        productId:product.id,
        productName:product.name,
        userId:user.id,
        startDate,
        endDate,
        days,
        total:days*product.price,
        status:"Confirmed"
    });

    saveData(KEY.bookings,bookings);

    this.reset();

    alert("Booking confirmed! Enjoy your rental.");
    showPage("bookings");
});


// MY BOOKINGS

function renderBookings(){
    const user=currentUser();
    const container=document.getElementById("bookingList");

    container.replaceChildren();

    if(!user)return;

    const bookings=getData(KEY.bookings)
        .filter(b=>b.userId===user.id);

    if(!bookings.length){
        container.innerHTML=
            '<div class="empty">No bookings yet. Explore something useful!</div>';
        return;
    }

    bookings.forEach(b=>{
        const card=document.createElement("div");
        card.className="booking-card";

        const title=document.createElement("h3");
        title.textContent=b.productName;

        const details=document.createElement("p");
        details.textContent=
            "From "+b.startDate+" to "+b.endDate+
            " | "+b.days+" days | Total ₹"+b.total+
            " | "+b.status;

        card.append(title,details);

        if(b.status==="Confirmed"){
            const button=document.createElement("button");
            button.className="btn btn-outline";
            button.textContent="Cancel Booking";
            button.onclick=()=>cancelBooking(b.id);
            card.appendChild(button);
        }

        container.appendChild(card);
    });
}


// CANCEL BOOKING

function cancelBooking(id){
    if(!confirm("Are you sure you want to cancel?"))return;

    const bookings=getData(KEY.bookings);
    const booking=bookings.find(b=>b.id===id);
    const user=currentUser();

    if(!booking||!user||booking.userId!==user.id)return;

    booking.status="Cancelled";

    saveData(KEY.bookings,bookings);
    renderBookings();

    alert("Booking cancelled.");
}


// CUSTOMER FEEDBACK & REPORTS (saved locally for this demo)
const FEEDBACK_KEY="reuse_customer_feedback";
const REPORTS_KEY="reuse_customer_reports";

function saveFormEntry(key,entry){
    const entries=getData(key);
    entries.push(entry);
    saveData(key,entries);
}

function openReportForm(product){
    showPage("feedback");
    const productInput=document.getElementById("reportProduct");
    const issueSelect=document.getElementById("reportIssue");
    productInput.value=product?.name || "";
    if(product) issueSelect.value="Incorrect product information";
    document.getElementById("reportDetails").focus();
    document.getElementById("reportForm").scrollIntoView({behavior:"smooth",block:"center"});
}

document.getElementById("feedbackForm").addEventListener("submit",function(event){
    event.preventDefault();
    const entry={
        id:makeId(), name:document.getElementById("feedbackName").value.trim(),
        type:document.getElementById("feedbackType").value,
        rating:Number(document.getElementById("feedbackRating").value),
        message:document.getElementById("feedbackMessage").value.trim(),
        userId:currentUser()?.id || null, createdAt:new Date().toISOString()
    };
    if(!entry.message){alert("Please enter your feedback.");return;}
    saveFormEntry(FEEDBACK_KEY,entry);
    this.reset();
    const success=document.getElementById("feedbackSuccess");
    success.classList.add("show");
    setTimeout(()=>success.classList.remove("show"),5000);
});

document.getElementById("reportForm").addEventListener("submit",function(event){
    event.preventDefault();
    const entry={
        id:makeId(), name:document.getElementById("reportName").value.trim(),
        issue:document.getElementById("reportIssue").value,
        product:document.getElementById("reportProduct").value.trim(),
        details:document.getElementById("reportDetails").value.trim(),
        userId:currentUser()?.id || null, createdAt:new Date().toISOString(), status:"New"
    };
    if(!entry.details){alert("Please describe the problem.");return;}
    saveFormEntry(REPORTS_KEY,entry);
    this.reset();
    const success=document.getElementById("reportSuccess");
    success.classList.add("show");
    setTimeout(()=>success.classList.remove("show"),5000);
});

// START

renderCategories();
renderFeatured();
renderProducts();
updateHeader();

// GET STARTED — close the welcome screen and reveal the homepage.
const getStartedBtn = document.getElementById("getStartedBtn");
const welcomeScreen = document.getElementById("welcomeScreen");

if (getStartedBtn && welcomeScreen) {
  getStartedBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getStartedBtn.disabled = true;
    welcomeScreen.classList.add("leaving");
    document.body.classList.remove("intro-open");

    const homeSection = document.getElementById("home");
    window.setTimeout(function () {
      welcomeScreen.remove();
      if (homeSection) {
        homeSection.classList.add("active");
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 600);
  });
}