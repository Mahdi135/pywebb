const keywords = ["def", "import", "if", "else", "for", "while", "return", "print", "try", "except", "class", "with", "as"];

function showSuggestions(value) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    
    if (value.length < 2) {
        suggestions.style.display = 'none';
        return;
    }

    const filteredKeywords = keywords.filter(keyword => keyword.startsWith(value));
    
    if (filteredKeywords.length > 0) {
        suggestions.style.display = 'block';
        filteredKeywords.forEach(keyword => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion');
            suggestionItem.textContent = keyword;
            suggestionItem.onclick = () => {
                document.getElementById('code-input').value += keyword + ' ';
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
            };
            suggestions.appendChild(suggestionItem);
        });
    } else {
        suggestions.style.display = 'none';
    }
}

function runPythonCode() {
    const code = document.getElementById('code-input').value;

    fetch('/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: code
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.output;
        document.getElementById('error').textContent = data.error;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
