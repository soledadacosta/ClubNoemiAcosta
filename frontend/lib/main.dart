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

// Sesión global de usuario
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
        'email': _emailController.text.trim(),
        'password': _passController.text.trim(),
      }),
    );

    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      
      // Mapeo seguro con los datos devueltos por el backend
      currentUserId = data['id'] ?? data['user_id'];
      currentUserName = data['nombre'] != null 
          ? "${data['nombre']} ${data['apellido']}" 
          : data['email'];

      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const MainTabsScreen()),
        );
      }
    } else {
      final error = jsonDecode(res.body);
      _showError(error['detail'] ?? 'Credenciales inválidas');
    }
  } catch (e) {
    _showError('Error de conexión o parseo: $e');
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
  bool _loading = false;

  Future<void> _register() async {
    setState(() => _loading = true);
    try {
      final res = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nombre': _nombre.text.trim(),
          'apellido': _apellido.text.trim(),
          'dni': _dni.text.trim(),
          'fecha_nacimiento': '2000-01-01',
          'email': _email.text.trim(),
          'password': _pass.text.trim(),
        }),
      );

      if (res.statusCode == 201) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('¡Cuenta creada con éxito! Ya podés ingresar.'), backgroundColor: Colors.green),
          );
          Navigator.pop(context);
        }
      } else {
        final error = jsonDecode(res.body);
        final msg = error['detail'] is List ? error['detail'][0]['msg'] : error['detail'] ?? 'Error al registrar';
        if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: Colors.red));
      }
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error de conexión: $e'), backgroundColor: Colors.red));
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Registro de Usuario')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 450),
            child: Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.person_add_alt_1_rounded, size: 48, color: Colors.deepPurple),
                    const SizedBox(height: 16),
                    const Text('Crear Nueva Cuenta', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 24),
                    TextField(
                      controller: _nombre,
                      decoration: const InputDecoration(labelText: 'Nombre', prefixIcon: Icon(Icons.person), border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _apellido,
                      decoration: const InputDecoration(labelText: 'Apellido', prefixIcon: Icon(Icons.person_outline), border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _dni,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(labelText: 'DNI', prefixIcon: Icon(Icons.badge), border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _email,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email), border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _pass,
                      obscureText: true,
                      decoration: const InputDecoration(labelText: 'Contraseña', prefixIcon: Icon(Icons.lock), border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 24),
                    _loading
                        ? const CircularProgressIndicator()
                        : ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              minimumSize: const Size.fromHeight(50),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            ),
                            onPressed: _register,
                            child: const Text('Crear Cuenta', style: TextStyle(fontSize: 16)),
                          )
                  ],
                ),
              ),
            ),
          ),
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

// --- 4. SEDES PAGE ---
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

// --- 5. ESPACIOS PAGE CON SELECTOR DE FECHA Y HORA ---
class EspaciosPage extends StatefulWidget {
  final String sedeId;
  final String sedeNombre;
  const EspaciosPage({super.key, required this.sedeId, required this.sedeNombre});

  @override
  State<EspaciosPage> createState() => _EspaciosPageState();
}

class _EspaciosPageState extends State<EspaciosPage> {
  List espacios = [];
  DateTime selectedDate = DateTime.now();
  String selectedHora = '18:00';

  final List<String> horariosDisponibles = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  @override
  void initState() {
    super.initState();
    _loadEspacios();
  }

  void _loadEspacios() {
    http.get(Uri.parse('$baseUrl/espacios?sede_id=${widget.sedeId}')).then((res) {
      if (res.statusCode == 200) {
        setState(() => espacios = jsonDecode(res.body));
      }
    });
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 30)),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final fechaFormateada = "${selectedDate.year}-${selectedDate.month.toString().padLeft(2, '0')}-${selectedDate.day.toString().padLeft(2, '0')}";

    return Scaffold(
      appBar: AppBar(title: Text(widget.sedeNombre)),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.deepPurple.shade50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton.icon(
                  icon: const Icon(Icons.calendar_today),
                  label: Text(fechaFormateada),
                  onPressed: () => _selectDate(context),
                ),
                DropdownButton<String>(
                  value: selectedHora,
                  items: horariosDisponibles.map((String hora) {
                    return DropdownMenuItem<String>(
                      value: hora,
                      child: Text("$hora hs"),
                    );
                  }).toList(),
                  onChanged: (val) {
                    if (val != null) setState(() => selectedHora = val);
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: espacios.length,
              itemBuilder: (_, i) {
                final e = espacios[i];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text(e['nombre'], style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Text("${e['deporte']} - \$${e['precio_por_hora']}/hs"),
                    trailing: ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.deepPurple, foregroundColor: Colors.white),
                      child: const Text('Reservar'),
                      onPressed: () => _reservar(e['id'], fechaFormateada),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _reservar(String espacioId, String fecha) async {
    final horaInicio = "$selectedHora:00";
    final int horaInt = int.parse(selectedHora.split(':')[0]) + 1;
    final horaFin = "${horaInt.toString().padLeft(2, '0')}:00:00";

    final res = await http.post(
      Uri.parse('$baseUrl/reservas'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'usuario_id': currentUserId,
        'espacio_id': espacioId,
        'fecha': fecha,
        'hora_inicio': horaInicio,
        'hora_fin': horaFin,
      }),
    );

    if (mounted) {
      if (res.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('¡Reserva confirmada para el $fecha a las $selectedHora hs!'), backgroundColor: Colors.green),
        );
      } else {
        final error = jsonDecode(res.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error['detail'] ?? 'Error al realizar reserva'), backgroundColor: Colors.red),
        );
      }
    }
  }
}

// --- 6. MIS RESERVAS PAGE ---
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
