# 💻 Project Commands — EduManagePro

## 📁 View Project Structure (CMD)
```cmd
:: Full tree with all files
tree "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /F

:: Folder structure only
tree "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro"

:: Save to a file
tree "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /F > project_structure.txt
```

---

## 📄 List All Files (CMD)
```cmd
:: All files recursively
dir "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /S

:: Only .jsx files
dir "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /S /B *.jsx

:: Only .java files
dir "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /S /B *.java

:: Only .css files
dir "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro" /S /B *.css
```

---

## 🔍 Search Inside Files (CMD)
```cmd
:: Search keyword in all files
findstr /S /I "keyword" "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\*.*"

:: Search in .jsx files
findstr /S /I "Student" "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\*.jsx"

:: Search in .java files
findstr /S /I "Controller" "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\*.java"
```

---

## 🚀 Run the Project

### Frontend (React + Vite)
```cmd
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-frontend"
npm run dev
```

### Backend (Spring Boot - Maven)
```cmd
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-backend"
mvn spring-boot:run
```

### Backend via JAR
```cmd
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-backend\target"
java -jar *.jar
```

---

## 📦 View Project Config
```cmd
:: Frontend package.json
type "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-frontend\package.json"

:: Backend pom.xml
type "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-backend\pom.xml"
```

---

## 🗂️ Quick Navigation
```cmd
:: Go to project root
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro"

:: Go to frontend
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-frontend"

:: Go to backend
cd "C:\Users\Mansi Kushwaha\.gemini\antigravity\scratch\EduManagePro\edumanage-backend"

:: Go back one level
cd ..
```

---

## 📦 NPM Useful Commands
```cmd
:: Install all dependencies
npm install

:: Install a new package
npm install package-name

:: Check outdated packages
npm outdated

:: Build for production
npm run build
```
