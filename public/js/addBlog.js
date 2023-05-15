async function newFormHandler(event) {
    event.preventDefault();
   
    const title = document.querySelector('#blog-title').value;
    const text = document.querySelector('#text').value;

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-blog-form').addEventListener('submit', newFormHandler);