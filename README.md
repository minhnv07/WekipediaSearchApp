# Ứng dụng Web Tìm kiếm Wikipedia

## Mô tả

Đây là một ứng dụng web cho phép người dùng tìm kiếm bài viết trên Wikipedia theo từ khóa. Ứng dụng sử dụng **JavaScript thuần (Vanilla JS)**, gọi API từ Wikipedia và hiển thị kết quả dưới dạng lưới, cho phép xem chi tiết từng bài viết với trải nghiệm người dùng mượt mà, responsive.

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
/wikipedia-search/
├── index.html // Giao diện chính
├── style.css // CSS layout và responsive
├── script.js // Logic chính: API, sự kiện, render UI
├── README.md // Tài liệu mô tả dự án


---

## Cài đặt

1. **Tải dự án về máy hoặc mở bằng Live Server**
   - Hoặc clone từ GitHub nếu có:
     ```bash
     git clone https://github.com/ten-cua-ban/wikipedia-search.git
     cd wikipedia-search
     ```

2. **Mở file `index.html` bằng trình duyệt**

3. **Bắt đầu tìm kiếm**
   - Nhập từ khóa, chọn gợi ý hoặc nhấn Enter
   - Bấm vào kết quả để xem chi tiết

---

## 🔗 API sử dụng

- **Wikipedia Search API**
https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={keyword}&gsrlimit=20&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&format=json&origin=*

- **Suggestion API (gợi ý tìm kiếm)**
[text](https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={keyword}&srlimit=3&format=json&origin=*)

- **Chi tiết bài viết**
https://en.wikipedia.org/w/api.php?action=query&pageids={pageid}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&format=json&origin=*

