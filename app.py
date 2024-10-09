from flask import Flask, request, jsonify, render_template
import subprocess
import sys

app = Flask(__name__)

# الصفحة الرئيسية تعرض واجهة HTML
@app.route('/')
def home():
    return render_template('index.html')

# مسار لتشغيل كود Python المدخل من المستخدم
@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()  # قراءة البيانات المدخلة بصيغة JSON
    code = data.get('code', '')  # الحصول على الكود المدخل

    try:
        # حفظ الكود في ملف مؤقت
        with open("code.py", "w") as f:
            f.write(code)

        # تشغيل الكود باستخدام مفسر Python
        result = subprocess.run([sys.executable, "code.py"], capture_output=True, text=True, timeout=10)

        # إعادة النتائج إلى المستخدم
        return jsonify({
            'output': result.stdout,  # إخراج الكود
            'error': result.stderr    # في حال وجود أخطاء في الكود
        })
    except Exception as e:
        # إعادة الخطأ إذا حدث استثناء
        return jsonify({
            'error': str(e)
        })

# بدء تشغيل التطبيق Flask
if __name__ == '__main__':
    app.run(debug=False)
