PGDMP                       }            Modelagem_do_banco_de_dados    17.4    17.4     6           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            7           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            8           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            9           1262    16733    Modelagem_do_banco_de_dados    DATABASE     �   CREATE DATABASE "Modelagem_do_banco_de_dados" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pt-BR';
 -   DROP DATABASE "Modelagem_do_banco_de_dados";
                     postgres    false            �            1259    16746    estoque    TABLE     z   CREATE TABLE public.estoque (
    id integer NOT NULL,
    nome_produto text NOT NULL,
    quantidade integer NOT NULL
);
    DROP TABLE public.estoque;
       public         heap r       postgres    false            �            1259    16745    estoque_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estoque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.estoque_id_seq;
       public               postgres    false    220            :           0    0    estoque_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.estoque_id_seq OWNED BY public.estoque.id;
          public               postgres    false    219            �            1259    16755    pedidos    TABLE     �   CREATE TABLE public.pedidos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    produto_id integer NOT NULL,
    quantidade integer NOT NULL
);
    DROP TABLE public.pedidos;
       public         heap r       postgres    false            �            1259    16754    pedidos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pedidos_id_seq;
       public               postgres    false    222            ;           0    0    pedidos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;
          public               postgres    false    221            �            1259    16735    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16734    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public               postgres    false    218            <           0    0    usuario_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            �           2604    16749 
   estoque id    DEFAULT     h   ALTER TABLE ONLY public.estoque ALTER COLUMN id SET DEFAULT nextval('public.estoque_id_seq'::regclass);
 9   ALTER TABLE public.estoque ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16758 
   pedidos id    DEFAULT     h   ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);
 9   ALTER TABLE public.pedidos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16738    usuarios id    DEFAULT     i   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            1          0    16746    estoque 
   TABLE DATA           ?   COPY public.estoque (id, nome_produto, quantidade) FROM stdin;
    public               postgres    false    220   �       3          0    16755    pedidos 
   TABLE DATA           I   COPY public.pedidos (id, usuario_id, produto_id, quantidade) FROM stdin;
    public               postgres    false    222   �       /          0    16735    usuarios 
   TABLE DATA           :   COPY public.usuarios (id, nome, email, senha) FROM stdin;
    public               postgres    false    218          =           0    0    estoque_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.estoque_id_seq', 10, true);
          public               postgres    false    219            >           0    0    pedidos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedidos_id_seq', 15, true);
          public               postgres    false    221            ?           0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 15, true);
          public               postgres    false    217            �           2606    16753    estoque estoque_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoque_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.estoque DROP CONSTRAINT estoque_pkey;
       public                 postgres    false    220            �           2606    16760    pedidos pedidos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public                 postgres    false    222            �           2606    16744    usuarios unique_email 
   CONSTRAINT     Q   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT unique_email UNIQUE (email);
 ?   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT unique_email;
       public                 postgres    false    218            �           2606    16742    usuarios usuario_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuario_pkey;
       public                 postgres    false    218            �           2606    16766    pedidos fk_produto_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_produto_id FOREIGN KEY (produto_id) REFERENCES public.estoque(id);
 ?   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT fk_produto_id;
       public               postgres    false    220    222    4760            �           2606    16761    pedidos fk_usuario_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 ?   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT fk_usuario_id;
       public               postgres    false    218    4758    222            1   �   x�]�1n�0Eg�>A!�Q����vi��Y�
PĀ��ޣ'(:� �X�4�����-�t&ϙ�=7;>�T/�a�Ǘ(Ä�U2�K�p;x+_4�[��C�2s�l$�0��%���?��{RY�+������?�Ai/
��5��*�8ej�%�p(�Iaa��G�ϢS�uԀm��=;�OE�8��?�
��Y�      3   U   x�%MA�0:�c�Qkm����c��
2�@C���D��_X(�噾7����H��Ϡ�إ��p\��nmB]�\�,?y.�/��l      /   �  x�e��N�0����T8���
D+6�Ԁ+ǆq��s����Ř�Yջ�$��3���~���'����0��Z��� ��TE)
X{��89��9*{Y�Z�p��B��Ɠ���'^},l��\״���vr�{��1D؟0&�$e���{��G�o{;ET�ZW����<[Ey��`?S{.��F4��4/�=KA�`�%V5���P���Da��,�B����hHn����[����*�^wB]�#�t��[�wv@�dd��2I��P
n��_�����G��aHe��ѥP�D�v��X`O8&��VB��f��8dJQ�����P�}��I<�#GEx����H8��E�E�ٿ�?|=J>���ۄÉ�|����J�إq     