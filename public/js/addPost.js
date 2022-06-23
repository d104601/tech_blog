const addPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(
        "Any field can't be empty"
      );
    }
  };

document.querySelector("#addPost").addEventListener("submit", addPost);