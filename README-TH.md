# ครูถ้วย Bio — คู่มือภาษาไทย

## เริ่มใช้งาน
1. แตก ZIP แล้วเปิด `index.html` ด้วย Chrome ได้ทันที (ไม่ต้องติดตั้งโปรแกรม)
2. เปิดไฟล์ `data.js` ด้วย VS Code หรือ Notepad และแก้ชื่อ ข้อความ URL และรายการ `links`
3. เปลี่ยนรูปโปรไฟล์โดยวางรูปไว้ใน `assets/` เช่น `assets/profile.jpg` แล้วแก้ `avatar` ใน `data.js`
4. แก้สีด้วยค่า `accent`, `accent2`, `background` ใน `data.js`
5. ต้องการเพิ่มปุ่ม ให้คัดลอกวัตถุ `{id, title, subtitle, url, icon, badge, enabled}` ในอาร์เรย์ `links` แล้วคั่นด้วยเครื่องหมายคอมมา
6. ไอคอนใช้ได้: `heart`, `users`, `line`, `share`, `globe`, `star`, `send`
7. `enabled: false` จะซ่อนปุ่ม และ `enabled: true` จะแสดงปุ่ม

> ไม่มีระบบล็อกอิน/หน้า Admin หรือฐานข้อมูล ข้อมูลเผยแพร่ผ่านไฟล์ `data.js` จึงไม่ควรใส่รหัสผ่านหรือข้อมูลลับในไฟล์นี้

## ข้อมูลที่ยึดจากเว็บไซต์เดิม
- ชื่อย่อย `#123255`
- หัวข้อ `💚 เ ปิ ด ว า ร์ ป เ ด็ ด 💚`
- ปุ่ม `💝 สมัครที่นี่ 24 ชั่วโมง 💝` และ `🎉 เข้ากลุ่มดูคลิป FREE 🎉`
- ข้อมูลข้างต้นเป็นเนื้อหาที่เข้าถึงได้จาก kruthuay.xyz ณ วันที่จัดทำ ไฟล์ภาพและ CSS แบบเต็มของบริการเดิมไม่พร้อมให้ตรวจสอบ จึงใช้ดีไซน์ใหม่และภาพแทนชั่วคราว

## อัปโหลดขึ้น GitHub Pages (ฟรีสำหรับ Public Repository)
1. สมัคร GitHub, สร้าง repository ชื่อ `kruthuay-bio` แบบ **Public**
2. อัปโหลด **เนื้อหาข้างในโฟลเดอร์** ให้ `index.html`, `style.css`, `script.js`, `data.js`, `CNAME`, `assets/` อยู่ที่ root repository
3. Settings > Pages > Build and deployment > Deploy from a branch > `main` > `/(root)` > Save
4. ทดสอบลิงก์ `https://USERNAME.github.io/kruthuay-bio/` (การมี CNAME ใน root อาจทำให้ระบบเปลี่ยนเส้นทางไปโดเมนจริง จึงทดสอบแบบละเอียดก่อนด้วยการใช้ repository ทดลองที่ไม่ใส่ CNAME หรือรอจน DNS เปลี่ยน)
5. ตั้งค่า Settings > Pages > Custom domain ให้เป็น `kruthuay.xyz`
6. ที่ Porkbun > Domain Management > DNS: ลบ A record `@` เดิมที่ชี้ `144.126.241.59` ของ HeyLink.me เมื่อพร้อมย้ายจริง และเพิ่ม A `@` 4 ค่า:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
7. ถ้าต้องการ `www.kruthuay.xyz` เพิ่ม CNAME host `www` value `USERNAME.github.io` (แก้ USERNAME ให้ตรง)
8. รอ DNS / Certificate, เปิด `Enforce HTTPS` ใน GitHub Settings > Pages หลังพร้อม
9. ทดสอบ `https://kruthuay.xyz` และ `https://www.kruthuay.xyz` บน True และ AIS

### ระวัง
- อย่าเปลี่ยน DNS ก่อนเว็บใหม่พร้อม เพราะเว็บ HeyLink.me เดิมจะหยุดแสดงบนโดเมนหลัก
- ไม่จำเป็นต้องเปลี่ยน Nameserver ของ Porkbun เพื่อใช้ GitHub Pages
- หากตั้งค่า `go.kruthuay.xyz` เป็น URL Forwarding ไว้แล้ว อย่าลบ record ของ `go` โดยไม่ตั้งใจ
- TXT สำหรับ HeyLink.me (`verify`) ไม่จำเป็นสำหรับเว็บไซต์ใหม่ แต่เก็บไว้ก่อนได้จนกว่าจะมั่นใจว่าการย้ายสำเร็จ
- GitHub Pages สำหรับเว็บสาธารณะ: โค้ดและไฟล์ config ใน Public repository เปิดให้ทุกคนเห็น
- อย่านำเว็บแบบ static ไปใช้เก็บข้อมูลส่วนตัวในฝั่งเบราว์เซอร์โดยไม่มี backend ที่ปลอดภัย

## แก้ไขลิงก์หลังอัปโหลด
เปิด `data.js` ใน GitHub > Edit (รูปดินสอ) > Commit changes รอการเผยแพร่รอบใหม่ แล้วรีเฟรชหน้าเว็บ

เอกสาร GitHub: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
