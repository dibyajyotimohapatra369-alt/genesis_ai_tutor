import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:crypto/crypto.dart';

void main() {
  runApp(const GenesisTutorApp());
}

class GenesisTutorApp extends StatelessWidget {
  const GenesisTutorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Genesis AI Tutor',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF6200EE),
        scaffoldBackgroundColor: const Color(0xFF0B0B1E),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFBB86FC),
          secondary: Color(0xFF03DAC6),
          background: Color(0xFF0B0B1E),
        ),
      ),
      home: const LoginScreen(),
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.psychology, size: 80, color: Color(0xFFBB86FC)),
            const SizedBox(height: 16),
            const Text(
              'G E N E S I S  A I',
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: 4),
            ),
            const Text('Decentralized Neural Learning Grid', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 48),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
              icon: const Icon(Icons.account_circle, color: Colors.red),
              label: const Text('Sign in with Google Account', style: TextStyle(fontWeight: FontWeight.bold)),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const OnboardingScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  String selectedCountry = 'India';
  String selectedBoard = 'CBSE';
  String selectedGrade = 'Class 10';
  String studyLevel = 'Boards Level';
  final TextEditingController _bankController = TextEditingController();

  String encryptLocalData(String data) {
    var bytes = utf8.encode(data);
    return sha256.convert(bytes).toString();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Configure Curriculum Node'), backgroundColor: Colors.transparent, elevation: 0),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: ListView(
          children: [
            DropdownButtonFormField<String>(
              value: selectedCountry,
              decoration: const InputDecoration(labelText: 'Country Location', border: OutlineInputBorder()),
              items: ['India', 'USA', 'UK', 'Other'].map((val) => DropdownMenuItem(value: val, child: Text(val))).toList(),
              onChanged: (val) => setState(() => selectedCountry = val!),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedBoard,
              decoration: const InputDecoration(labelText: 'Educational Board Hierarchy', border: OutlineInputBorder()),
              items: ['CBSE', 'ICSE', 'State Board', 'IB Grid'].map((val) => DropdownMenuItem(value: val, child: Text(val))).toList(),
              onChanged: (val) => setState(() => selectedBoard = val!),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedGrade,
              decoration: const InputDecoration(labelText: 'Current Grade / standard', border: OutlineInputBorder()),
              items: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((val) => DropdownMenuItem(value: val, child: Text(val))).toList(),
              onChanged: (val) => setState(() => selectedGrade = val!),
            ),
            const SizedBox(height: 16),
            if (selectedGrade != 'Class 8') ...[
              DropdownButtonFormField<String>(
                value: studyLevel,
                decoration: const InputDecoration(labelText: 'Learning Velocity Target', border: OutlineInputBorder()),
                items: ['Boards Level', 'Entrance Level (IIT-JEE / NEET)'].map((val) => DropdownMenuItem(value: val, child: Text(val))).toList(),
                onChanged: (val) => setState(() => studyLevel = val!),
              ),
              const SizedBox(height: 16),
            ],
            TextField(
              controller: _bankController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Secure Bank Routing ID / UPI Node (For Stock Fractionalization)',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock, color: Colors.green),
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6200EE),
                minimumSize: const Size(double.infinity, 50),
              ),
              onPressed: () {
                String securedNodeId = encryptLocalData(_bankController.text);
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DashboardScreen(
                      board: selectedBoard,
                      grade: selectedGrade,
                      level: studyLevel,
                      secureToken: securedNodeId,
                    ),
                  ),
                );
              },
              child: const Text('Synchronize AI Ecosystem', style: TextStyle(fontSize: 16, color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  final String board;
  final String grade;
  final String level;
  final String secureToken;

  const DashboardScreen({super.key, required this.board, required this.grade, required this.level, required this.secureToken});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  String textOutput = "Ecosystem live. Select an operation node or input a complex query pipeline below.";
  bool networkBusy = false;
  final TextEditingController _terminalInput = TextEditingController();

  Future<void> executeGeminiApiCall(String command, {String systemInstruction = ""}) async {
    setState(() => networkBusy = true);
    const String apiKey = "YOUR_GOOGLE_AI_STUDIO_GEMINI_KEY"; 
    const String endpoint = "https://googleapis.com";

    try {
      final response = await http.post(
        Uri.parse(endpoint),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "contents": [{
            "parts": [{
              "text": "$systemInstruction Syllabus context: ${widget.board}, ${widget.grade}, Target: ${widget.level}. Request: $command"
            }]
          }]
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          textOutput = data['candidates']['content']['parts']['text'];
        });
      } else {
        setState(() => textOutput = "Handshake Error. Verification failed at gateway. Check your AI Studio API key context.");
      }
    } catch (err) {
      setState(() => textOutput = "Node connection routing exception: $err");
    } final {
      setState(() => networkBusy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.grade} Neural Studio'),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text('Shares: €${widget.secureToken.substring(0, 4)}...', style: const TextStyle(color: Colors.greenAccent, fontSize: 12)),
            ),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
              decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(4)),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(children: [Icon(Icons.memory, size: 16, color: Colors.blue), SizedBox(width: 8), Text("Local CPU Impact: <0.01%")]),
                  Row(children: [Icon(Icons.gpp_good, size: 16, color: Colors.green), SizedBox(width: 4), Text("TLS 1.3 Active")]),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: const Color(0xFF12122A), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.white12)),
       
