import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

const String baseUrl = 'http://localhost:8000';

void main() {
  runApp(const ClubNoemiApp());
}

class ClubNoemiApp extends StatelessWidget {
  const ClubNoemiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Club Noemí Acosta',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}

// Global user session
String? currentUserId;
String? currentUserName;

// --- 1. LOGIN SCREEN ---
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passController = TextEditingController();
  bool _loading = false;

  Future<void> _login() async {
    setState(() => _loading = true);
    try {
      final res = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': _emailController.text,
          'password': _passController.text,
        }),
      );

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        currentUserId = data['id'];
        currentUserName = "${data['nombre']} ${data['apellido']}";
        if (mounted) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => const MainTabsScreen()),
          );
        }
      } else {
        _showError('Credenciales inválidas');
      }
    } catch (e) {
      _showError('Error de conexión');
    } finally {
      setState(() => _loading = false);
    }
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 400),
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.sports_tennis, size: 64, color: Colors.deepPurple),
              const SizedBox(height: 16),
              const Text('Club Noemí Acosta', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 32),
              TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email', border: OutlineInputBorder())),
              const SizedBox(height: 16),
              TextField(controller: _passController, obscureText: true, decoration: const InputDecoration(labelText: 'Contraseña', border: OutlineInputBorder())),
              const SizedBox(height: 24),
              _loading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
                      onPressed: _login,
                      child: const Text('Iniciar Sesión'),
                    ),
              TextButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RegisterScreen())),
                child: const Text('¿No tenés cuenta? Registrate'),
              )
            ],
          ),
        ),
      ),
    );
  }
}

// --- 2. REGISTER SCREEN ---
class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _nombre = TextEditingController();
  final _apellido = TextEditingController();
  final _dni = TextEditingController();
  final _email = TextEditingController();
  final _pass = TextEditingController();

  Future<void> _register() async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'nombre': _nombre.text,
        'apellido': _apellido.text,
        'dni': _dni.text,
        'fecha_nacimiento': '2000-01-01',
        'email': _email.text,
        'password': _pass.text,
      }),
    );

    if (res.statusCode == 201) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Cuenta creada con éxito!')));
        Navigator.pop(context);
      }
    } else {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error al registrar usuario')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Registro')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            TextField(controller: _nombre, decoration: const InputDecoration(labelText: 'Nombre')),
            TextField(controller: _apellido, decoration: const InputDecoration(labelText: 'Apellido')),
            TextField(controller: _dni, decoration: const InputDecoration(labelText: 'DNI')),
            TextField(controller: _email, decoration: const InputDecoration(labelText: 'Email')),
            TextField(controller: _pass, obscureText: true, decoration: const InputDecoration(labelText: 'Contraseña')),
            const SizedBox(height: 24),
            ElevatedButton(onPressed: _register, child: const Text('Crear Cuenta'))
          ],
        ),
      ),
    );
  }
}

// --- 3. MAIN TABS SCREEN ---
class MainTabsScreen extends StatefulWidget {
  const MainTabsScreen({super.key});

  @override
  State<MainTabsScreen> createState() => _MainTabsScreenState();
}

class _MainTabsScreenState extends State<MainTabsScreen> {
  int _idx = 0;
  final _pages = const [SedesPage(), MisReservasPage()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_idx],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _idx,
        onTap: (i) => setState(() => _idx = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.location_on), label: 'Sedes'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_month), label: 'Mis Reservas'),
        ],
      ),
    );
  }
}

// --- 4. SEDES & ESPACIOS PAGE ---
class SedesPage extends StatefulWidget {
  const SedesPage({super.key});

  @override
  State<SedesPage> createState() => _SedesPageState();
}

class _SedesPageState extends State<SedesPage> {
  List sedes = [];

  @override
  void initState() {
    super.initState();
    http.get(Uri.parse('$baseUrl/sedes')).then((res) {
      if (res.statusCode == 200) {
        setState(() => sedes = jsonDecode(res.body));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Bienvenido, $currentUserName')),
      body: ListView.builder(
        itemCount: sedes.length,
        itemBuilder: (_, i) {
          final s = sedes[i];
          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              title: Text(s['nombre']),
              subtitle: Text(s['direccion']),
              trailing: const Icon(Icons.arrow_forward),
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => EspaciosPage(sedeId: s['id'], sedeNombre: s['nombre'])),
              ),
            ),
          );
        },
      ),
    );
  }
}

class EspaciosPage extends StatefulWidget {
  final String sedeId;
  final String sedeNombre;
  const EspaciosPage({super.key, required this.sedeId, required this.sedeNombre});

  @override
  State<EspaciosPage> createState() => _EspaciosPageState();
}

class _EspaciosPageState extends State<EspaciosPage> {
  List espacios = [];

  @override
  void initState() {
    super.initState();
    http.get(Uri.parse('$baseUrl/espacios?sede_id=${widget.sedeId}')).then((res) {
      if (res.statusCode == 200) {
        setState(() => espacios = jsonDecode(res.body));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.sedeNombre)),
      body: ListView.builder(
        itemCount: espacios.length,
        itemBuilder: (_, i) {
          final e = espacios[i];
          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              title: Text(e['nombre']),
              subtitle: Text("${e['deporte']} - \$${e['precio_por_hora']}/hs"),
              trailing: ElevatedButton(
                child: const Text('Reservar'),
                onPressed: () => _reservar(e['id']),
              ),
            ),
          );
        },
      ),
    );
  }

  Future<void> _reservar(String espacioId) async {
    final res = await http.post(
      Uri.parse('$baseUrl/reservas'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'usuario_id': currentUserId,
        'espacio_id': espacioId,
        'fecha': '2026-08-25',
        'hora_inicio': '18:00:00',
        'hora_fin': '19:00:00'
      }),
    );

    if (mounted) {
      if (res.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('¡Reserva realizada con éxito!')));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error al realizar reserva.')));
      }
    }
  }
}

// --- 5. MIS RESERVAS PAGE ---
class MisReservasPage extends StatefulWidget {
  const MisReservasPage({super.key});

  @override
  State<MisReservasPage> createState() => _MisReservasPageState();
}

class _MisReservasPageState extends State<MisReservasPage> {
  List reservas = [];

  void _load() {
    http.get(Uri.parse('$baseUrl/reservas?usuario_id=$currentUserId')).then((res) {
      if (res.statusCode == 200) {
        setState(() => reservas = jsonDecode(res.body));
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mis Reservas')),
      body: reservas.isEmpty
          ? const Center(child: Text('No tenés reservas registradas.'))
          : ListView.builder(
              itemCount: reservas.length,
              itemBuilder: (_, i) {
                final r = reservas[i];
                return Card(
                  margin: const EdgeInsets.all(8),
                  child: ListTile(
                    title: Text("Fecha: ${r['fecha']}"),
                    subtitle: Text("Horario: ${r['hora_inicio']} - ${r['hora_fin']}\nMonto: \$${r['monto_total']}"),
                    trailing: IconButton(
                      icon: const Icon(Icons.cancel, color: Colors.red),
                      onPressed: () async {
                        await http.delete(Uri.parse('$baseUrl/reservas/${r['id']}'));
                        _load();
                      },
                    ),
                  ),
                );
              },
            ),
    );
  }
}