let suggestionData = []; 

const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const message = document.getElementById('message');
const result = document.getElementById('result');
const loading = document.getElementById('loading');
const suggestionBox = document.getElementById('suggestion-box');
const detail = document.getElementById('detail');
const resultContainer = document.getElementById('resultContainer');

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}

function truncateAtWord(str, n) {
  if (!str) return '';
  if (str.length <= n) return str;
  let sub = str.substr(0, n);
  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > 0) {
    sub = sub.substr(0, lastSpace);
  }
  return sub + "...";
}

function searchWikipedia(keyword){
    return new Promise(function(resolve, reject) {
    if(!keyword || keyword.length < 3) {
        reject("Từ khóa phải có ít nhất 3 ký tự!");
        return;
    }

    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(keyword)}&gsrlimit=10&prop=pageimages|extracts|info&inprop=url&piprop=thumbnail&pithumbsize=300&exintro&explaintext&exlimit=max&format=json&origin=*`;



    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.query && data.query.pages) {
                resolve(data.query.pages);
            } else {
                reject("Không tìm thấy kết quả phù hợp.");
            }
        })
        .catch(error => {
            reject("Lỗi khi kết nối đến Wikipedia: " + error.message);
        });
    });
}

function getWikipediaDetail(pageid) {
    return new Promise(function(resolve, reject) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageid}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.query && data.query.pages && data.query.pages[pageid]) {
                    resolve(data.query.pages[pageid]);
                } else {
                    reject("Không lấy được chi tiết bài viết.");
                }
            })
            .catch(error => reject("Lỗi khi kết nối Wikipedia API!"));
    });
}

function showDetail(pageid) {

    document.querySelector('.container').style.display = 'none';

    detail.innerHTML = '<div style="color:#0078d7">Loading details...</div>';
    detail.style.display = 'block';
    resultContainer.style.display = 'none'; 

    getWikipediaDetail(pageid)
        .then(function(page) {
            detail.innerHTML = `
                <button id="backBtn">Back to results</button>
                <div class="page-header">
                    <h2 class="page-title">${page.title}</h2>
                    <p>From Wikipedia, the free encyclopedia</p>
                </div>
                ${page.thumbnail ? `<img src="${page.thumbnail.source}" alt="${page.title}" class="page-image">` : ""}
                <div class="page-content">
                    ${page.extract ? `<p>${page.extract}</p>` : '<p>No content available for this page.</p>'}
                </div>
                <div style="margin-top: 30px; text-align: center;">
                    <a href="${page.fullurl}" target="_blank" class="search-btn">
                    Read full article on Wikipedia
                    </a>
                </div>
            `;
            document.getElementById('backBtn').onclick = function() {
                detail.style.display = 'none';
                resultContainer.style.display = 'block';
                document.querySelector('.container').style.display = 'block';
            }

        })
        .catch(function(error) {
            detail.innerHTML = `<div style="color:red;">${error}</div>
                                <button id="backBtn" style="margin-top:10px;">Back to results</button>`;
            document.getElementById('backBtn').onclick = function() {
                detail.style.display = 'none';
                resultContainer.style.display = 'block';
            }
        });
}

document.addEventListener('DOMContentLoaded', function() {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const keyword = input.value.trim();
    message.textContent = "";
    result.innerHTML = "";
    console.log("Bạn vừa tìm kiếm:", keyword);

    loading.textContent = "Searching...";
    loading.style.display = 'block';

    searchWikipedia(keyword)
    .then(function(pages) {
        loading.style.display = 'none';

        let html = '<div class="grid-container">';

        if(Object.keys(pages).length === 0) {
            message.textContent = "Không tìm thấy kết quả phù hợp.";
            return;
        }
        Object.values(pages).forEach(page => {
            html += `
                <div class="card">
                    ${page.thumbnail
                    ? `<img src="${page.thumbnail.source}" alt="Thumbnail">`
                    : ""}
                    <div class="card-title" data-pageid="${page.pageid}" style="cursor:pointer; ">
                    ${page.title}
                    </div>
                    ${page.extract ? `<div class="card-extract">${truncateAtWord(page.extract, 200)}</div>` : ""}
                </div>
                `;
        });
        html += '</div>';

        result.innerHTML = html;

        document.querySelectorAll('.card-title').forEach(function(title) {
            title.addEventListener('click', function() {
            const pageid = title.getAttribute('data-pageid');
            showDetail(pageid);
        });
});
        
    })
    .catch(function(error) {
        loading.style.display = 'none';
        message.style.color = 'red';
        message.textContent = error;
    });
  });
});



searchInput.addEventListener('input', debounce(function () {
    const query = this.value.trim();
    if (query.length < 3) {
        suggestionBox.style.display = 'none';
        return;
    }
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages|extracts&exintro&explaintext&exlimit=max&format=json&origin=*`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let items = [];
        if (data.query && data.query.pages) {
          items = Object.values(data.query.pages);
          suggestionData = items;
        } else {
          suggestionData = [];
        }
        if (items.length > 0) {
          suggestionBox.innerHTML = items.map(item => `
            <div class="suggestion-item" data-title="${item.title.replace(/"/g, "&quot;")}">
              <strong>${item.title}</strong>
              <span>${item.extract ? truncateAtWord(item.extract, 150) : ""}</span>
            </div>
          `).join('');
          suggestionBox.style.display = 'block';
        } else {
          suggestionBox.style.display = 'none';
        }
      })
      .catch(() => suggestionBox.style.display = 'none');
}, 500));


suggestionBox.addEventListener('click', function (e) {
    const item = e.target.closest('.suggestion-item');
    if (item) {
        searchInput.value = item.getAttribute('data-title');
        suggestionBox.style.display = 'none';
        document.getElementById('searchForm').dispatchEvent(new Event('submit', {bubbles: true}));
    }
});


document.addEventListener('click', function (e) {
    if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
        suggestionBox.style.display = 'none';
    }
});