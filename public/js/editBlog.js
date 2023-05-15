const editFormHandler = async (event) => {
    try {
        const title = document.querySelector('input[name="blog-title"]').value.trim();
        const content = document.querySelector('input[name="content"]').value.trim();

        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                blog_id: id,
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        }

    } catch (err) {
        alert(response.statusText);
    }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);