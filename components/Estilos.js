import { StyleSheet } from 'react-native';

export var colorPrincipal = '#ae5be1';
var black = '#594069';

export const stylesInicioActividad = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: colorPrincipal,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 40,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const stylesPerfilUsuario = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  editText: {
    color: '#007bff',
    marginBottom: 20,
    marginLeft: 25,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: colorPrincipal,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    elevation: 4,
  },
  buttonType2: {
    backgroundColor: black,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextType2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export const stylesMapa = StyleSheet.create({
  mapa: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
});

export const stylesModal = StyleSheet.create({
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenido: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBotonPrincipal: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: colorPrincipal
  },
    modalBotonSecundario: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: black
  },
});
