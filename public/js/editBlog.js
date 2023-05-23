const editFormHandler = async (event) => {
    event.preventDefault();
    try {
        const title = document.querySelector('input[name="blog-title"]').value.trim();
        const text = document.querySelector('input[name="content"]').value.trim();

        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
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
        }

    } catch (err) {
        alert(response.statusText);
    }
}

document.querySelector('.edit-blog-form').addEventListener('click', editFormHandler);