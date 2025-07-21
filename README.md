# Ứng dụng Web Tìm kiếm Wikipedia

## Mô tả

Đây là một ứng dụng web cho phép người dùng tìm kiếm bài viết trên Wikipedia theo từ khóa. Ứng dụng sử dụng **JavaScript thuần (Vanilla JS)**, gọi API từ Wikipedia và hiển thị kết quả dưới dạng lưới, cho phép xem chi tiết từng bài viết với trải nghiệm người dùng mượt mà, responsive.

Link demo: https://wekipedia-search-app.vercel.app/
---

## Tính năng chính

- **Tìm kiếm Wikipedia bằng từ khóa**
  - Nhập từ khóa (tối thiểu 3 ký tự)
  - Gợi ý bài viết hiển thị sau khi dừng gõ 500ms (debounce)
  - Hiển thị 3 kết quả gợi ý trong suggestion box
  - Kiểm tra lỗi nhập liệu và cảnh báo nếu chưa hợp lệ

- **Hiển thị kết quả tìm kiếm**
  - Dạng lưới (CSS Grid)
  - Hiển thị tiêu đề, hình ảnh (nếu có), trích đoạn bài viết
  - Bấm vào tiêu đề hoặc nút “View Details” để xem chi tiết bài viết
  - Nếu không có hình ảnh hoặc extract, sẽ xử lý fallback

- **Xem chi tiết bài viết**
  - Hiển thị tiêu đề, ảnh thumbnail, trích dẫn nội dung, nút đọc bài gốc
  - Có nút “Back to results” quay lại danh sách mà không phải tìm kiếm lại
  - Ẩn phần tìm kiếm khi vào trang chi tiết

- **Xử lý logic và trạng thái**
  - Loading rõ ràng khi đang tải dữ liệu
  - Quản lý lỗi API, không tìm thấy bài viết, hoặc lỗi mạng
  - Lưu trạng thái tìm kiếm (state) để quay lại không bị mất dữ liệu

- **Giao diện responsive**
  - Thiết kế thích ứng cho Desktop, Tablet và Mobile
  - Giao diện sạch, dễ đọc và dễ sử dụng

---

## Cấu trúc dự án
```
WIKIPEDIASEARCHAPPLICATION/
├── Assignment_FEA.pdf     # File đề bài gốc từ FEA
├── README.md              # File mô tả dự án
└── src/
    ├── index.html         # Giao diện chính của ứng dụng
    ├── script.js          # JavaScript: gọi API, xử lý sự kiện, render UI
    └── style.css          # CSS layout, responsive, và style cho trang web
```

---

## Cài đặt

1. **Tải dự án về máy hoặc mở bằng Live Server**
   - Hoặc clone từ GitHub nếu có:
     ```bash
     git clone https://github.com/minhnv07/WekipediaSearchApp.git
     cd wikipedia-search
     ```

2. **Mở file `index.html` bằng trình duyệt** 

3. **Bắt đầu tìm kiếm**
   - Nhập từ khóa, chọn gợi ý hoặc nhấn Enter
   - Bấm vào kết quả để xem chi tiết

---

## 🔗 API sử dụng

- **Wikipedia Search API**
```
https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(keyword)}&gsrlimit=10&prop=pageimages|extracts|info&inprop=url&piprop=thumbnail&pithumbsize=300&exintro&explaintext&exlimit=max&format=json&origin=*
```
- **Suggestion API (gợi ý tìm kiếm)**
```
https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages|extracts&exintro&explaintext&exlimit=max&format=json&origin=*
```
- **Chi tiết bài viết**
```
https://en.wikipedia.org/w/api.php?action=query&pageids=${pageid}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*
```

---
## 📜 Ghi chú

- Dữ liệu được lấy từ [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)

---
